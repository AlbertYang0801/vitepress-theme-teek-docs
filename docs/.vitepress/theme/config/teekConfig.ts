import type { TeekConfig } from "@teek/config";

// 文档配置
export const teekDocConfig: TeekConfig = {
    themeEnhance: {
        layoutSwitch: {
            defaultMode: "bothWidthAdjustable",
        }
    },
};

// https://vp.teek.top/reference/config/global-config.html#anchorscroll
// 博客基础配置
const teekBlogCommonConfig: TeekConfig = {
    teekHome: true,
    vpHome: false,
    wallpaper: {
        enabled: true,
    },
    viewTransition: true,
    footerInfo: {
        customHtml: `<span id="runtime"></span>`, // 需要搭配 .vitepress/theme/helper/useRuntime.ts 使用
    },
    themeEnhance:{

    },
    topArticle:{
        enabled: false
    },
    tag:{
        enabled: false
    },
    category:{
        enabled: false,
    },
    //启用 不蒜子（Busuanzi） 网站统计服务，主要作用是为网站提供轻量级的访问计数器功能
    docAnalysis: {
        enabled: true,
        createTime: "2024-7-10",
        wordCount: true,
        readingTime: true,
        statistics: {
            provider: "busuanzi",
            siteView: true,
            pageView: true,
        },
        overrideInfo: [
            {
                key: "lastActiveTime",
                label: "活跃时间",
                value: (_, currentValue) => (currentValue + "").replace("前", ""),
                show: true,
            },
        ]
    },
    friendLink: {
        list: [
            {
                name: "vuepress-theme-vdoing",
                desc: "🚀一款简洁高效的VuePress 知识管理&博客 主题",
                avatar: "https://doc.xugaoyi.com/img/logo.png",
                link: "https://doc.xugaoyi.com/",
            }
        ],
        autoScroll: true,
    },
    social: [
        {
            icon: "mdi:github",
            name: "GitHub",
            link: "https://github.com/AlbertYang0801",
        },
        {
            icon: "simple-icons:gitee",
            name: "Gitee",
            link: "https://gitee.com/zztiyjw",
        },
    ],
};

// 博客默认配置
export const teekBlogConfig: TeekConfig = {
    ...teekBlogCommonConfig,
    banner: {
        name: "🎉 AlbertYang Blog",
        description: "从 Hello World 开始，旅程永无止境。",
        bgStyle: "partImg",
    },
};

// 博客小图配置
export const teekBlogParkConfig: TeekConfig = {
    ...teekBlogCommonConfig,
    banner: {
        name: "🎉 AlbertYang Blog",
        bgStyle: "partImg",
        imgSrc: ["/blog/bg21.jpg"],
        description: [
            "从 Hello World 开始，旅程永无止境。",
            "积跬步以至千里，致敬每个爱学习的你 —— 来自 Evan Xu",
            "这一生波澜壮阔或是不惊都没问题 —— 来自 Weibw",
        ],
        descStyle: "switch",
    },
};

// 博客大图配置
export const teekBlogFullConfig: TeekConfig = {
    ...teekBlogCommonConfig,
    post: {
        coverImgMode: "full",
    },
    banner: {
        name: "🎉 Teek Blog",
        bgStyle: "fullImg",
        imgSrc: ["/blog/bg21.jpg"],
        description: [
            "故事由我书写，旅程由你见证，传奇由她聆听 —— 来自 Young Kbt",
            "积跬步以至千里，致敬每个爱学习的你 —— 来自 Evan Xu",
            "这一生波澜壮阔或是不惊都没问题 —— 来自 Weibw",
        ],
        descStyle: "types",
    },
    comment: {
        provider: "giscus",
        options: {
            repo: "Kele-Bingtang/vitepress-theme-teek",
            repoId: "R_kgDONpVfBA",
            category: "Announcements",
            categoryId: "DIC_kwDONpVfBM4Cm3v9",
        },
    },
};

// 博客全图配置
export const teekBlogBodyConfig: TeekConfig = {
    ...teekBlogCommonConfig,
    banner: {
        name: "🎉 AlbertYang Blog",
        description: "从 Hello World 开始，旅程永无止境。",
        bgStyle: "partImg",
    },
    pageStyle: "segment-nav",
    bodyBgImg: {
        imgSrc: ["/blog/bg21.jpg"],
    },
    themeEnhance: {
        layoutSwitch: {
            defaultMode: "original",
        },
    },
};

// 博客卡片配置
export const teekBlogCardConfig: TeekConfig = {
    ...teekBlogCommonConfig,
    post: {
        postStyle: "card",
    },
    homeCardListPosition: "left",
    banner: {
        name: "🎉 AlbertYang Blog",
        bgStyle: "fullImg",
        imgSrc: [
            "/hangzhou/xihu.jpg",
            "/scene/2.jpg",
            "/scene/3.png",
            "/scene/4.png",
            "/scene/5.png",
            "/scene/6.png",
            // "/blog/bg21.jpg",
            // "/blog/bg23.jpg"
        ],
        description: [
            "从 Hello World 开始，旅程永无止境。",
            "正在加载人生意义…… (进度 30%)",
            "NPC: Nice Programming Code."
        ],
        descStyle: "types",
    },
};
