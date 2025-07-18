# ClickHouse物化列序列化报错问题

### 报错内容

```java
No serializer found for column 'date'. Did you forget to register it?
	at com.clickhouse.client.api.Client.insert(Client.java:1317)
	at com.clickhouse.client.api.Client.insert(Client.java:1266)
```

### 表结构

```java
CREATE TABLE IF NOT EXISTS metric_data
(
    `placeId` UInt32,
    `ip` String,
    `pid` UInt32,
    `time` DateTime64(3, 'Asia/Shanghai'),
    `tid` UInt32,
    `value` Float64,
    `date` Date MATERIALIZED toDate(time)  -- 物化日期列
)
ENGINE = MergeTree()
PARTITION BY date  -- 按天分区(直接使用物化日期列)
ORDER BY (placeId, tid, time, pid)  -- 保持原有排序键
TTL time + INTERVAL 7 DAY  -- 设置7天自动过期
SETTINGS index_granularity = 8192;
```

ClickHouse的物化列是由数据库自己计算的，理论上不需要声明，insert 的时候也不需要处理该字段。

但是在调用 insert 方法的时候

```java
    public CompletableFuture<InsertResponse> insert(String tableName, List<?> data) {
        return this.insert(tableName, data, new InsertSettings());
    }
```

## 解决办法

升级 client-v2 版本，确保版本在 0.8.5 以上。

```java
        <!--clickhouse-http-->
        <dependency>
            <groupId>com.clickhouse</groupId>
            <artifactId>client-v2</artifactId>
            <version>0.8.5</version>
        </dependency>
```

clickhouse-java v0.8.5 已经解决了该问题。

[https://github.com/ClickHouse/clickhouse-java/pull/2320](https://github.com/ClickHouse/clickhouse-java/pull/2320)

![image.png](https://s2.loli.net/2025/07/11/rbiBqxcMIdkVsDj.png)