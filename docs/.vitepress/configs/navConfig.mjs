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
        text: version,
        items: [
            { text: "历史版本", link: "https://github.com/Kele-Bingtang/vitepress-theme-teek/releases" },
            { text: "更新日志", link: "https://github.com/Kele-Bingtang/vitepress-theme-teek/blob/dev/CHANGELOG.md" },
        ],
    },
]