import {version} from "vitepress-theme-teek/es/version";

export default [
    { text: "首页", link: "/" },
    {
        text: "Java",
        items: [
            {text: "JVM", link: '/java/jvm/'},
            {text: "高并发", link: '/java/concurrent/'},
            {text: "IO", link: '/java/io/'},
            {text: '缓存', link: '/java/cache/'},
            {text: '集合', link: '/java/collection/'}
        ]
    },
    {
        text: "指南",
        link: "/guide/intro",
        activeMatch: "/02.指南/",
    },
    { text: "配置", link: "/reference/config", activeMatch: "/10.配置/" },
    { text: "开发", link: "/develop/intro", activeMatch: "/15.主题开发/" },
    {
        text: "功能页",
        items: [
            { text: "归档页", link: "/archives" },
            { text: "清单页", link: "/articleOverview" },
            { text: "登录页", link: "/login" },
            { text: "风险链接提示页", link: "/risk-link?target=https://vp.teek.top" },
            { text: "分类页", link: "/categories" },
            { text: "标签页", link: "/tags" },
        ],
    },
    {
        text: version,
        items: [
            { text: "历史版本", link: "https://github.com/Kele-Bingtang/vitepress-theme-teek/releases" },
            { text: "更新日志", link: "https://github.com/Kele-Bingtang/vitepress-theme-teek/blob/dev/CHANGELOG.md" },
        ],
    },
]