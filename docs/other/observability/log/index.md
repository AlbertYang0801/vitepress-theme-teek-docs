# 日志收集全链路

## ELFK

ELFK 指的是 elasticsearch+logstash+filebeat+kibana

### 日志管理

日志收集→格式化分析→检索和可视化→日志告警

![image.png](https://s2.loli.net/2025/07/16/JtsXzkTbKPh1c4H.png)

### 日志架构

#### 小规模环境

![image.png](https://s2.loli.net/2025/07/16/zd3eOvFMg2PQZYK.png)

![image.png](https://s2.loli.net/2025/07/16/CpAiqwokbmTxXrF.png)

### 大规模生产环境

ELFK + Kafka

### Logstash

从多个来源采集数据，转换数据，然后将数据放到不同的数据库中。

da 就很像 logstash 的功能设计。

#### 架构

![image.png](https://s2.loli.net/2025/07/16/dWwuoypQDrPgvqA.png)

Logstash 接入数据源数据，经过内部 Pipeline，将数据可以写到不同的存储（ES、Kafka）里面。

Logstash内部包含 Input、Filter（可选）、OutPut 插件。

- Input

​	[Input plugins | Logstash Reference [7.17] | Elastic](https://www.elastic.co/guide/en/logstash/7.17/input-plugins.html)

- Output

​	[Output plugins | Logstash Reference [7.17] | Elastic](https://www.elastic.co/guide/en/logstash/7.17/output-plugins.html)

- Filter

​	[Filter plugins | Logstash Reference [7.17] | Elastic](https://www.elastic.co/guide/en/logstash/7.17/filter-plugins.html)



#### Kafka

数据发给Kafka。

```java
    input {
      beats {
        port => 5044
      }
    }
    output {
      if([log_topic]){
        kafka{
          topic_id => "%{log_topic}"
          bootstrap_servers => "kafka-svc:59092"
          codec => "json"
        }
      }else{
        kafka{
           topic_id => "systemlog"
          bootstrap_servers => "kafka-svc:59092"
          codec => "json"
        }
      }
    }
```



#### Es

数据发给es。

```
    input {
      beats {
        port => 5044
      }
    }
    output {
      if([log_topic]){
        elasticsearch {
          hosts => ["10.10.103.35:39200"]
          index => "apm2.0-%{masterIp}-%{log_topic}-%{+YYYY.MM.dd}"
          user => "elastic"
          password => "Hc@Cloud01"
        }
       stdout { codec => rubydebug }
      }else{
        elasticsearch {
          hosts => ["10.10.103.35:39200"]
          index => "apm2.0-yanshi_default_default_system-%{+YYYY.MM.dd}"
          user => "elastic"
          password => "Hc@Cloud01"
        }
       stdout { codec => rubydebug }
      }
    }
```

### Filebeat

Filebeat专门用于转发和收集日志数据的轻量级采集工具。

它可以作为代理安装在服务器上，Filebeat**监视指定路径的日志文件**，收集日志数据，并将收集到的日志转发到Elasticsearch或者Logstash。

#### 工作原理

![image.png](https://s2.loli.net/2025/07/16/wNy73utR859rVjb.png)

- 启动FileBeat时，会启动多个输入（Input），这些Input监控指定的日志数据位置。
- FileBeat会针对每一个文件启动一个Harvester（收割机）。
- Harvester读取每一个文件的日志，将新的日志发送到libbeat，libbeat将数据收集到一起，并将数据发送给输出（Output）。

FileBeat 是基于 golang 编写的，功能较少但资源消耗也比较小，更轻量级。

#### 配置

```yaml
# 请放置到inputs.d文件夹下,无需重启filebeat
- type: log
  enabled: true
  ignore_older: 60h
  paths:
    - /home/tomcat/apache-tomcat/logs/*.log
    - /home/tomcat/apache-tomcat/logs/*.out
    - /home/tomcat/logs/*.log
  fields_under_root: true
  fields:
    masterIp: yanshi_default_default
    app_name: boper
    host_ip: 10.10.102.88
    log_type: app
    env_type: vm
    log_topic: logserver
```

#### 容器采集

Filebeat 原生不支持容器内文件采集，需要人工将日志挂在于宿主机HostPath。

> 因为Filebeat没有容器相关信息，所以不知道容器动态挂载的文件路径。Ilogtail维护了容器列表，不需要人工挂载。



## Ilogtail

https://ilogtail.gitbook.io/ilogtail-docs

阿里云开源的日志采集探针，性能更好，可以替代Filebeat。

> iLogtail 为可观测场景而生，拥有的轻量级、高性能、自动化配置等诸多生产级别特性，在阿里巴巴以及外部数万家阿里云客户内部广泛应用。你可以将它部署于物理机，虚拟机，Kubernetes等多种环境中来采集遥测数据，例如logs、traces和metrics。



[容器场景iLogtail与Filebeat性能对比测试](https://ilogtail.gitbook.io/ilogtail-docs/benchmark/performance-compare-with-filebeat)

![image-20250716150410294](https://s2.loli.net/2025/07/16/cQzZBpa8oVuK7kl.png)