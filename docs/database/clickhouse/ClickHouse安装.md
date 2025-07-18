# ClickHouse安装

[docker下安装clickhouse_docker 安装clickhouse-CSDN博客](https://blog.csdn.net/qq_20042935/article/details/132554426)

使用 clickhouse-client 进入 ck

### mac 安装

```java
docker run --rm -d --name=clickhouse \
-e CLICKHOUSE_ADMIN_PASSWORD="123456" \
--ulimit nofile=262144:262144 \
-p 8123:8123 -p 9009:9009 -p 9090:9000 \
-v /Users/yangjunwei/ck/config:/etc/clickhouse-server \
-v /Users/yangjunwei/ck/data:/var/lib/clickhouse/data \
-v /Users/yangjunwei/ck/log:/var/log/clickhouse-server \
bitnami/clickhouse:latest
```

### 虚拟机

注意：**linux 上面参考这个教程**

[Docker安装Clickhouse详细教程_clickhouse docker安装-CSDN博客](https://blog.csdn.net/wangwenzhe222/article/details/135833222)

修改密码

```java
vi /etc/clickhouse-server/users.xml
```

```java
<password_sha256_hex>8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92</password_sha256_hex>
```

新增test用户

```java
<test>
		<password_sha256_hex>8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92</password_sha256_hex>
		<networks incl="networks" replace="replace">
				<ip>::/0</ip>
		</networks>
		<profile>default</profile>
		<quota>default</quota>
</test>
```

## 测试成功

[http://localhost:8123/play](http://localhost:8123/play)

![image.png](https://s2.loli.net/2025/07/14/KFLg6jfzywNAhX3.png)