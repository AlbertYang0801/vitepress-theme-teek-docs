# Opentelemetry

[docs-cn/OT.md at main · open-telemetry/docs-cn](https://github.com/open-telemetry/docs-cn/blob/main/OT.md)

## OpenTracing&OpenCensus

- OpenTracing 制定了一套平台无关、厂商无关的协议标准，使得开发人员能够方便的添加或更换底层 APM 的实现。
- OpenCensus支持Metrics、分布式跟踪。

## OpenTelemetry

OpenTelemetry 的核心工作目前主要集中在 3 个部分：

1. **规范的制定和协议的统一，规范包含数据传输、API的规范。**协议的统一包含：HTTP W3C的标准支持及GRPC 等框架的协议标准。
2. 多语言SDK的实现和集成，用户可以使用 SDK 进行代码自动注入和手动埋点，同时对其他三方库（Log4j、LogBack等）进行集成支持；
3. 数据收集系统的实现，当前是基于 OpenCensus Service 的收集系统，包括 Agent 和 Collector。

OpenTelemetry 的自身定位很明确：**数据采集和标准规范的统一**，对于数据如何去使用、存储、展示、告警，官方是不涉及的。

## 架构

![image.png](https://s2.loli.net/2025/07/16/cUypDZ6nLvGJM8O.png)

![image.png](https://s2.loli.net/2025/07/16/ZpNX6LnQY4r1asy.png)

第三方将数据通过 OTLP 协议上报，然后 OTEL Collector 接收数据之后可以转换格式，写入第三方数据源，比如 Prometheus。

![image.png](https://s2.loli.net/2025/07/16/kIVHsUcXD9eJ52R.png)

## 数据格式定义

- Protobuf格式
  
    [opentelemetry-proto/metrics.proto at main · open-telemetry/opentelemetry-proto](https://github.com/open-telemetry/opentelemetry-proto/blob/main/opentelemetry/proto/metrics/v1/metrics.proto)
    
- Json格式
  
    [opentelemetry-proto/examples/metrics.json at main · open-telemetry/opentelemetry-proto](https://github.com/open-telemetry/opentelemetry-proto/blob/main/examples/metrics.json)
    
- Otel2PrometheusConverter
  
    Otel 数据转换为 Prometheus 格式数据。
    
    [opentelemetry-java/exporters/prometheus/src/main/java/io/opentelemetry/exporter/prometheus/Otel2PrometheusConverter.java at main · open-telemetry/opentelemetry-java](https://github.com/open-telemetry/opentelemetry-java/blob/main/exporters/prometheus/src/main/java/io/opentelemetry/exporter/prometheus/Otel2PrometheusConverter.java)
    

## 参考文档

[什么是 OpenTelemetry？](https://opentelemetry.io/zh/docs/what-is-opentelemetry/)