# k8s常用命令

## 常用命令总结

### node

- 查看所有的node
  
    ```
    kubectl get nodes
    ```
    
- 查看node名与Host文件的相互解析
  
    ```
    cat /etc/hosts
    ```
    
- 查看本机 hostname
  
    `Plain Text   cat /etc/hostname`
    

### namespace

- 查看所有的namespace
  
    ```
    [root@master ~]# kubectl  get namespace
    NAME              STATUS   AGE
    default           Active   45h     #  所有未指定Namespace的对象都会被分配在default命名空间
    kube-node-lease   Active   45h     #  集群节点之间的心跳维护，v1.13开始引入
    kube-public       Active   45h     #  此命名空间下的资源可以被所有人访问（包括未认证用户）
    kube-system       Active   45h     #  所有由Kubernetes系统创建的资源都处于这个命名空间
    ```
    
- 查看指定namespace
  
    ```
    kubectl get ns dev
    ```
    
- 指定格式输出（常见的有wide、json、yaml）
  
    ```
    kubectl get ns dev -o yaml
    ```
    
- 查看namespace详情
    - kubectl describe ns default
    
    ```
    # 4 查看ns详情  命令：kubectl describe ns ns名称
    [root@master ~]# kubectl describe ns default
    Name:         default
    Labels:       <none>
    Annotations:  <none>
    Status:       Active  # Active 命名空间正在使用中  Terminating 正在删除命名空间
    
    # ResourceQuota 针对namespace做的资源限制
    # LimitRange针对namespace中的每个组件做的资源限制
    No resource quota.
    No LimitRange resource.
    ```
    
- 查看一个namespace的所有信息（service、pod、workload）
  
    ```
    kubectl get all -n dev
    ```
    
- 删除namespace
  
    ```
    kubectl delete ns dev
    ```
    
- 查看所有namespace资源使用情况
  
    ```
    kubectl top pod --all-namespaces
    ```
    

### pod

- 查看某个命名空间下的所有 pod
  
    ```java
    kubectl get pods -n cloudmonitor
    ```
    
- 运行nginx的pod
  
    ```
    kubectl run nginx --image=nginx:latest --port=80 --namespace dev
    ```
    
- 获取访问pod的Ip
  
    ```
    kubectl get pods -n dev -o wide
    ```
    
- 查看某个pod的详细信息
  
    ```
    kubectl describe pod nginxdeploy-7b748b7c69-2npd5 -n dev
    ```
    
- 根据yaml文件创建pod
  
    ```
    kubectl create -f nginxpod.yaml
    ```
    
    nginx的yaml文件内容：
    
    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
      name: nginxpod
      namespace: dev
      labels:
        app: web
    spec:
     containers:
      - name: nginx-containers
        image: nginx:latest
        imagePullPolicy: Never
        ports:
        - name: http
          containerPort: 80    
          hostPort: 80    
          protocol: TCP
    ```
    
- 查看pod的资源使用情况
  
    ```
    kubectl top pod -n monitoring
    ```
    
- 复制文件到pod中
  
    ```
    kubectl cp async-profiler-2.6-linux-x64  cloudmonitor/apm-data-analyzer-0:/root
    ```
    
- 从pod中复制文件到虚拟机（pod内有多个容器要指定容器名）
  
    容器中的文件放到 /root 目录下。
    
    ```
    kubectl cp cloudmonitor/apm-data-analyzer-0:da.html /home/asyncprofile/da.html
    ```
    
- 进入pod（单个容器）
  
    ```
     kubectl exec -it apm-data-analyzer-0 -n cloudmonitor bash
    ```
    
- 查看 pod 的日志
  
    ```
     kubectl logs -f apm-data-analyzer-0 -n cloudmonitor
    ```
    

### service

- 查看service
  
    ```
    kubectl get service -n dev
    ```
    
- 查看某个service的详细信息
  
    ```
    kubectl describe svc svc-nginx1 -n dev
    ```
    
- 指定 type = `ClusterIP` 的 service（只能集群内部访问）
  
    ```
    kubectl expose deploy nginxdeploy --name=svc-nginx1 --type=ClusterIP --port=80 --target-port=80 -n dev
    ```
    
- 指定 type = `NodePort` 的 service（集群外部也可访问）
  
    ```
    kubectl expose deploy nginxdeploy --name=svc-nginx2 --type=NodePort --port=80 --target-port=80 -n dev
    ```
    
- 删除 service
  
    ```
    kubectl delete svc svc-nginx1 -n dev
    ```
    
- 修改service的type
  
    ```
    kubectl patch svc webnginx-service -p '{"spec":{"type":"NodePort"}}' -n default
    ```
    
- 查看service的endpoint列表
  
    endpoint：是服务对应的 Pod IP：容器端口。
    
    ```
    kubectl get endpoints
    ```
    

### label

- 为pod资源打标签
  
    ```
    kubectl label pod nginx-pod version=1.0 -n dev
    ```
    
- 为pod资源更新标签
  
    ```
    kubectl label pod nginx-pod version=2.0 -n dev --overwrite
    ```
    
- 查看标签
  
    ```
    kubectl
    ```
    
- 查看某个namespace下拥有该标签的资源
  
    ```
    kubectl get pod -n cloudmonitor -l name=apm-es-server --show-labels
    ```
    

### deployment

- 利用deploy创建pod
  
    ```
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: nginx
      namespace: dev
    spec:
      replicas: 3   #副本数
      selector:
        matchLabels:
          run: nginx
      template:
        metadata:
          labels:
            run: nginx
        spec:
          containers:
          - image: nginx:latest
            name: nginx
            ports:
            - containerPort: 80
              protocol: TCP
    ```
    
- deploy编辑配置
  
    ```
    kubectl edit deploy nginxdeploy
    ```
    
    - 扩缩容 - 修改副本数，实现deploy的pod扩缩容。
      
        ```
        spec:
          replicas: 5   #副本数
          selector:
            matchLabels:
              run: nginx
        ```
        
    - 镜像升级
      
        ```
        spec:
          progressDeadlineSeconds: 600
          replicas: 1
          revisionHistoryLimit: 10
          selector:
            matchLabels:
              app: nginxdeploy
          strategy:
            rollingUpdate:
              maxSurge: 25%
              maxUnavailable: 25%
            type: RollingUpdate
          template:
            metadata:
              creationTimestamp: null
              labels:
                app: nginxdeploy
            spec:
              containers:
              - image: nginx:1.17.2     #修改镜像版本
                imagePullPolicy: Always
                name: nginx
                ports:
                - containerPort: 80
        ```
    
- 查看deploy信息
  
    ```
    kubectl get deploy -n dev [-o wide]
    ```
    
- 查看详细信息
  
    ```
    kubectl describe deploy -n dev
    ```
    

---

### request&limit

```
apiVersion: v1
kind: Pod
metadata:
  name: pod-resources
  namespace: dev
spec:
  containers:
  - name: nginx
    image: nginx:1.17.1
    resources: # 资源配额
      limits:  # 限制资源（上限）
        cpu: "2" # CPU限制，单位是core数
        memory: "10Gi" # 内存限制
      requests: # 请求资源（下限）
        cpu: "1"  # CPU限制，单位是core数
        memory: "10Mi"  # 内存限制
```

- request
  
    > 容器启动的最小限制资源。
    > 
- limit
  
    > 容器启动的最大限制资源。
    > 

---

测试 requst，设置 requests.memory = 20Gi，容器无法正常启动。查看 pod 详情，提示**内存不足**。

```
yangjunwei@yangjunweis-MacBook-Pro k8s % kubectl describe pod pod-resources -n dev
Name:         pod-resources
Namespace:    dev
Priority:     0
Node:         <none>
Labels:       <none>
Annotations:  <none>
Status:       Pending
IP:
IPs:          <none>
Containers:
  nginx:
    Image:      nginx:latest
    Port:       <none>
    Host Port:  <none>
    Limits:
      cpu:     2
      memory:  20Gi
    Requests:
      cpu:        1
      memory:     10Gi
    Environment:  <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-xtkq2 (ro)
Conditions:
  Type           Status
  PodScheduled   False
Volumes:
  kube-api-access-xtkq2:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   Burstable
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type     Reason            Age                From               Message
  ----     ------            ----               ----               -------
  Warning  FailedScheduling  34s (x2 over 36s)  default-scheduler  0/1 nodes are available: 1 Insufficient memory.
  (提示内存不足)
```

### resourceQuota

- 查看命名空间资源使用情况
  
    ```
    kubectl describe resourcequota -n bookdemo
    ```
    
    ```java
    [root@10 ~]#  kubectl describe resourcequota -n bookdemo
    Name:            quota-test
    Namespace:       bookdemo
    Resource         Used    Hard
    --------         ----    ----limits.cpu       1912m   2limits.memory    1200Mi  2Gi
    requests.cpu     1200m   2requests.memory  1200Mi  2Gi
    ```
    
- 查看ns的quota
  
    ```
    kubectl get quota -n bookdemo -o yaml
    ```
    
    ![](https://s2.loli.net/2025/07/15/MUlqdYz9Ja1I3B6.png)
    

### 污点

1. 查看node的污点

```
kubectl describe nodes  10.10.101.70-database-1  |grep Taints

```

1. 打污点

```
kubectl taint nodes node1 key1=value1:NoSchedule

```

1. 删除指定污点

```
kubectl taint node 10.10.101.70-database-1 node.kubernetes.io/disk-pressure:NoSchedule-

```

- 污点名称后要加 `-`

[https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/taint-and-toleration/](https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/taint-and-toleration/)

[污点和容忍度](https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/taint-and-toleration/)

## 学习笔记

### Volume存储卷-pod挂载本地目录

![](https://s2.loli.net/2025/07/15/zr5ePLZdfApTx8D.png)

```
apiVersion: v1
kind: Pod
metadata:
  name: esrally
  namespace: cloudmonitor
  labels:
    app: rally
spec:
  restartPolicy: Always
  nodeName: 10.1.11.200-master
  containers:
  - name: rally
    image: elastic/rally:latest
    imagePullPolicy: Always
    command:
    - tail
    - -f
    - /dev/null
    #容器目录
    volumeMounts:
    - name: rally-data
      mountPath: /tracks
  #本地目录
  volumes:
  - name: rally-data
    hostPath:
      path: /home/rally
```

### 删除pv绑定的pvc

删除pod，再删除pvc。

然后 pv的状态一直是**Released**，可以采用编辑 pv，删除与pvc的绑定信息。

![image.png](https://s2.loli.net/2025/07/15/3KxNPlS1t9fJ4QF.png)