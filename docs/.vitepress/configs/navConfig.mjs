import {version} from "vitepress-theme-teek/es/version";

export default [
    {text: "首页", link: "/"},
    {
        text: "Java",
        items: [
            {text: "JVM", link: '/java/jvm/'},
            {text: "高并发", link: '/java/concurrent/'},
            {text: "IO", link: '/java/io/'},
            {text: '缓存', link: '/java/cache/'},
            {text: '集合', link: '/java/collection/'},
            {text: '分布式', link: '/java/distributed/'},
        ]
    },
    {
        text: '框架',
        items: [
            {text: 'Spring', link: '/frame/spring/'},
            {text: 'MyBatis', link: '/frame/mybatis/'},
            {text: 'SpringBoot', link: '/frame/springboot/'},
            {text: 'SpringCloud', link: '/frame/springcloud/'},
            {text: 'Netty', link: '/frame/netty/'}
        ]
    },
    {
        "text": "数据库", items: [
            {text: 'MySQL', link: '/database/mysql/'},
            {text: "Redis", link: '/database/redis/'},
            {text: "ClickHouse", link: '/database/clickhouse/'}
        ]
    },
    {
        text: "中间件",
        items: [
            {text: 'Elasticsearch', link: '/middleware/es/'},
            {text: 'Kafka', link: '/middleware/kafka/'},
            {text: 'RocketMQ', link: '/middleware/rocketmq/'}
        ]
    },
    {
        text: "其它",
        items: [
            {
                text: "云原生",
                items: [
                    {text: 'Docker', link: '/cloudnative/docker/'},
                    {text: 'K8s', link: '/cloudnative/k8s/'},
                    {text: 'Prometheus', link: '/cloudnative/prometheus/'}
                ]
            },
            {
                text: '可观测性',
                items: [
                    {text: 'Opentelemetry', link: '/other/observability/Opentelemetry'},
                    {text: 'Skywalking', link: '/other/observability/skywalking/'},
                    {text: '日志收集', link: '/other/observability/日志收集全链路'}
                ]
            },
            {text: '设计模式', link: '/other/design/'},
            {text: '计算机网络', link: '/other/network/'},
            {text: '数据结构', link: '/other/datastructure/'},
            {text: '算法', link: '/other/algorithm/'}

        ]
    }
]