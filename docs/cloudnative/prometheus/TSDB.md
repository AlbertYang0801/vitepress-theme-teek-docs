# TSDB

Prometheus的 TSDB（Time Series Database）作为内置的时序数据库。

### 存储原理

TSDB 既使用内存也使用磁盘进行数据存储。

![image.png](https://s2.loli.net/2025/07/16/u2m1DCkNHFydQKZ.png)

### Head

在Prometheus中，Head 是数据库的内存部分，用于存储最近写入的数据。

当数据在Head中存储2小时后，会被转移到磁盘上的持久块（block）中。这些持久块是不变的，每个块代表一段时间的数据，并且按照时间顺序进行组织和存储。

![image.png](https://s2.loli.net/2025/07/16/dR48vI5AhuGS2WF.png)

### Block块

Prometheus中以每2个小时为一个时间窗口，即将2小时内产生的数据存储在一个block中，监控数据会以时间段的形式被拆分成不同的block，因此这样的block会有很多。

块的格式如下：

```
│   └── 01HB97EB5NDVB1VFB04W5D1XGE  #  block块
│       │   ├── chunks  # 样本数据
│       │   │   └── 000001
│       │   ├── index  # 索引文件
│       │   ├── meta.json  # block元数据信息
│       │   └── tombstones  # 逻辑数据
```

### WAL

Prometheus 还使用 WAL（Write-Ahead Logging）进行数据持久化。每当有新的数据写入时，WAL会先将数据写入到预写日志中，然后再将数据写入到 Head 和磁盘上的块中。这样，即使在系统崩溃的情况下，也可以通过 WAL 恢复数据。

因此，**Prometheus 的 TSDB 既使用内存也使用磁盘进行数据存储，并通过 Head 和持久块以及 WAL进行数据的读写和持久化**。