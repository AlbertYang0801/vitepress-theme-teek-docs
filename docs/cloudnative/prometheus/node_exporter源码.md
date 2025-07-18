# node_exporter源码

### 简单流程

1. 定时任务 30s 执行一次
    1. 调用采集指标的方法
2. 不同 Collector 采集自己的指标
    1. 内存
        - 读取 `/`@
          
            `proc/meminfo`文件内容
            
            ```go
            MemTotal:       16267496 kB
            MemFree:          803084 kB
            MemAvailable:    1507880 kB
            Buffers:               0 kB
            Cached:          1737804 kB
            SwapCached:            0 kB
            Active:          6116132 kB
            Inactive:         713876 kB
            Active(anon):    5607848 kB
            Inactive(anon):   310508 kB
            Active(file):     508284 kB
            Inactive(file):   403368 kB
            Unevictable:           0 kB
            Mlocked:               0 kB
            SwapTotal:             0 kB
            SwapFree:              0 kB
            Dirty:               200 kB
            Writeback:             0 kB
            AnonPages:       5092220 kB
            ```
        
    2. 磁盘
        - 读取 `/1/mounts`的内容
          
            ```go
            rootfs / rootfs rw 0 0
            sysfs /sys sysfs rw,nosuid,nodev,noexec,relatime 0 0
            proc /proc proc rw,nosuid,nodev,noexec,relatime 0 0
            devtmpfs /dev devtmpfs rw,nosuid,size=8122740k,nr_inodes=2030685,mode=755 0 0
            securityfs /sys/kernel/security securityfs rw,nosuid,nodev,noexec,relatime 0 0
            tmpfs /dev/shm tmpfs rw,nosuid,nodev 0 0
            devpts /dev/pts devpts rw,nosuid,noexec,relatime,gid=5,mode=620,ptmxmode=000 0 0
            tmpfs /run tmpfs rw,nosuid,nodev,mode=755 0 0
            tmpfs /sys/fs/cgroup tmpfs ro,nosuid,nodev,noexec,mode=755 0 0
            cgroup /sys/fs/cgroup/systemd cgroup rw,nosuid,nodev,noexec,relatime,xattr,release_agent=/usr/lib/systemd/systemd-cgroups-agent,name=systemd 0 0
            ```
    
3. 推送数据
    1. push gateway
    2. vmagent

```go

func main() {
	kingpin.Parse()

	config := config.InitConfig(*configFile)
	locallog := global.InitLog(&config.Global.LogConfig)
	asyncOpenPprof(&config.Global, locallog)
	locallog.Infof("log config level %s", config.Global.LogConfig.Level)
	logx.InitLogger(locallog)

	_, exists := os.LookupEnv(common.KINDLING_APP_NAME_KEY) // limit cpu
	if !exists {
		if config.Global.AppName == "" {
			locallog.Errorf("Please make sure config global.appName not is empty")
			os.Exit(1)
		}
		os.Setenv(common.KINDLING_APP_NAME_KEY, config.Global.AppName)
	}
	setMaxProcs()

	exposePort := config.Global.Port

	r := prometheus.NewRegistry()
	locallog.Infof("kindling exporter base label, masterIp: %s,  nodeName: %s", common.MasterIp, common.NodeName)

	if config.IsEnableNodeCollector() {
		locallog.Info("enable node collector")
		NodeInit()
	}

	var ksmc *ksmcollector.KsmCollector
	if config.IsEnableKsmCollector() {
		os.Setenv(common.KSM_COLLECTOR_ENABLE_KEY, "true")
		locallog.Info("enable ksm collector")
		ksmc = KsmInit(locallog, r, config.Component.Collector.KsmCollector)
		// print cache pod info ,test open, or else close
		// go containercache.IntervalPrintPodInfo()
	}
	if config.IsEnableContainerCollector() {
		locallog.Info("enable container collector")
		ContainerInit(locallog, config.Component.Collector.ContainerCollector)
	}

	if config.IsEnableProcessCollector() {
		locallog.Info("enable process collector")
		ProcessInit(locallog, config.Component.Collector.ProcessCollector)
	}

	locallog.Info("collectors exporter init successful")

	server := http.NewServeMux()
	server.Handle("/v1/ksm/getPodInfoByNodeName", ksmc)
	metricHandler := application.NewHandler(20, locallog)

	//推送数据
	exporterinit.InitExporter(&config.Component.Exporter, locallog, metricHandler)
	locallog.Infof("Kindling exporter listen port - %s", exposePort)

	if err := http.ListenAndServe(exposePort, server); err != nil {
		locallog.Errorf("start web server failed, errMsg: %s", err)
	}
}
```

```go
func InitExporter(config *config.Exporter, logger *zap.SugaredLogger, handler *application.Handler) {
	if !config.Enable {
		return
	}

	// todo ksm-slave don't send data
	if judgeKsmIsSlave() {
		return
	}

	if config.PushGatewayExporter.Enable {
		logger.Infof("exporter enable pushgatewayexporter")
		pushGatewayExporter, err := pushgatewayexporter.NewPushGatewayExporter(logger, &config.PushGatewayExporter)
		if err != nil {
			logger.Errorf("init pushgateway failed: %v", err)
			return
		}
		exporter.ExporterFactories[pushGatewayExporter.Name()] = pushGatewayExporter
	}

	//yjw 数据推送到 vmAgent
	if config.VmAgentExporter.Enable {
		logger.Infof("exporter enable vmagentexporter")
		vmagentExporter, err := vmagentexporter.NewVmAgentExporter(logger, &config.VmAgentExporter)
		if err != nil {
			logger.Errorf("init vminsert failed: %v", err)
			return
		}
		exporter.ExporterFactories[vmagentExporter.Name()] = vmagentExporter
	}
	cronStr := "* * * * *"
	intervalSecond := config.PushIntervalSecond
	if intervalSecond > 60 {
		cronStr = fmt.Sprintf(" */%d * * * *", intervalSecond/60)
	}

	//yjw 30s推送一次数据
	cronJob.AddFunc(cronStr, func() {
		logger.Infof("exporter data time %s", time.Now().Format(time_template))
		//获取数据
		data := getMetrics(handler)
		logger.Debugf("exporter send data , data len:%d", len(data))
		//yjw 遍历 push 端
		for _, sender := range exporter.ExporterFactories {
			//异步发送数据
			go asyncSendData(data, sender, logger, int(config.PushGatewayExporter.RetryCount))
		}
	})
	cronJob.Start()
}
```

```go
//yjw vmagent 发送数据的方法
func (p *VmInsertExporter) Send(data string) error {
	// 创建一个缓冲区，用于保存压缩后的数据
	var buf bytes.Buffer

	// 创建一个 gzip.Writer，将数据写入缓冲区
	gz := gzip.NewWriter(&buf)

	// 将文本数据写入 gzip.Writer
	_, err := gz.Write([]byte(data))
	if err != nil {
		p.logger.Errorf("compress data failed , %v", err)
		return err
	}

	// 关闭 gzip.Writer，确保所有数据都被写入缓冲区
	gz.Close()

	req := p.client.R()
	req.Header.Set("Content-Encoding", "gzip")
	req.SetBody(bytes.NewReader(buf.Bytes()))
	resp, err := req.Post(p.TargetUri())

	if err != nil {
		p.logger.Errorf("vmagent exporter send data failed, err: %v", err)
		return err
	}
	p.logger.Debugf("vmagent exporter send data successfual, resp: %s", string(resp.Body()))
	return nil
}
```