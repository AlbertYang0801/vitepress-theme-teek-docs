# Kafka分区机制策略

## 分区策略

**分区策略是决定生产者将消息发送到哪个分区的算法。**

### 轮询策略

是 Java 生产者 API 默认提供的分区策略。

- 轮询策略有非常优秀的负载均衡表现，它总是能保证消息最大限度地被平均分配到所有分区上，故默认情况下它是最合理的分区策略，也是我们最常用的分区策略之一。

![image.png](https://s2.loli.net/2025/06/26/FpJ1xmvKRX6lHjG.png)

### 随机策略

将消息随机写入分区

### key 指定分区

当发送消息时指定了key，Kafka会根据key的hash值与分区数取模来决定将数据写入哪个分区。

项目中 dr 就是生产这种方式，根据消息类型指定 key，比如 transactionId。这样能保证同一transactionId的数据都存放在相同的分区里面，这样在消费时就能保证被同一个消费者消费。（如果其它消费者阻塞了，容易导致写入数据慢或其它问题）

![image.png](https://s2.loli.net/2025/06/26/XFQ3xmIl2Ge1zrq.png)

Kafka 默认分区策略实际上同时实现了两种策略：

- 如果指定了 Key，那么默认实现按消息键保序策略；
- 如果没有指定 Key，则使用轮询策略。

### 默认分区策略

主要根据发送消息时是否指定 key 有关系：

- 指定了 key
  
    key 指定分区策略
    
- 如果未指定 key
  
    轮询策略
    

## 为什么引入分区

1. 对 kafka 来说，提高了 topic 的读写能力。
2. 对Consumer 来说，提高消费者的消费能力和扩展能力。