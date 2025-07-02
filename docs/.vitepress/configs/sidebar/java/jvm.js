// 为以下路由添加左侧边栏
export default [
    {
        text: "类加载器",
        collapsed: false,
        items: [
            {text: "Java类加载器", link: "/java/jvm/Java类加载器"},
            {text: "对象创建", link: "/java/jvm/对象创建"}
        ]
    },
    {
        text: "内存模型",
        collapsed: false,
        items: [
            {text: "JVM内存模型", link: "/java/jvm/JVM内存模型"}
        ]
    },
    {
        text: "垃圾回收",
        collapsed: false,
        items: [
            {text: "垃圾回收算法", link: "/java/jvm/垃圾回收算法"},
            {text: "垃圾回收器", link: "/java/jvm/垃圾回收器"},
            {text: "G1收集器", link: "/java/jvm/G1收集器"}
        ]
    },
    {
        text: "故障排查",
        collapsed: false,
        items: [
            {text: "JDK调优命令", link: "/java/jvm/JDK调优命令"},
            {text: "可视化工具", link: "/java/jvm/可视化工具"}
        ]
    },
    {
        text: "排障记录",
        collapsed: false,
        items: [
            {text: "CPU负载过高排查记录", link: "/java/jvm/CPU负载过高排查记录"},
            {text: "内存问题排查总结", link: "/java/jvm/内存问题排查总结"},
            {text: "频繁GC排查", link: "/java/jvm/频繁GC排查"}
        ]
    }
]
