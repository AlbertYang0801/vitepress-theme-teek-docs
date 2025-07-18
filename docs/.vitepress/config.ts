import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";
import { version } from "vitepress-theme-teek/es/version";

import navConfig from './configs/navConfig.mjs';
import sidebarConfig from './configs/sidebarConfig.mjs';


const description = [
  "欢迎来到 Albert Yang 的个人博客",
].toString();

const teekConfig = defineTeekConfig({
  author: { name: "Albert Yang", link: "https://github.com/AlbertYang0801/blog" },
  blogger: {
    avatar: "https://s2.loli.net/2025/07/18/gKh3Rix8bMYkQ1y.jpg",
    shape: "circle-rotate",
    name: "Albert Yang",
    slogan: "从 Hello World 开始，旅程永无止境。",
    circleBgImg: "/blog/bg14.jpg",
    color: "#ffffff",
  },
  footerInfo: {
    theme: {
      name: `Theme By Teek@${version}`,
    },
    copyright: {
      createYear: 2025,
      suffix: "Teek",
    },
  },
  codeBlock: {
    copiedDone: TkMessage => TkMessage.success("复制成功！"),
  },
  post: {
    showCapture: true,
  },
  articleShare: { enabled: true },
  vitePlugins: {
    sidebarOption: {
      initItems: false,
    },
  },
  markdown: {
    demo: {
      githubUrl: "https://github.com/Kele-Bingtang/vitepress-theme-teek/blob/master/docs",
    },
  },
  siteAnalytics: [
    // {
    //   provider: "baidu",
    //   options: {
    //     id: "d5ee872d9aa1ef8021f4a3921b2e9c2a",
    //   },
    // },
    // {
    //   provider: "google",
    //   options: {
    //     id: "G-K5GNDW3L7K",
    //   },
    // },
  ],
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/blog/",
  extends: teekConfig,
  title: "AlbertYang Blog",
  description: description,
  cleanUrls: false,
  lastUpdated: true,
  lang: "zh-CN",
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/teek-logo-mini.svg" }],
    ["link", { rel: "icon", type: "image/png", href: "/teek-logo-mini.png" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh-CN" }],
    ["meta", { property: "og:title", content: "Teek | VitePress Theme" }],
    ["meta", { property: "og:site_name", content: "Teek" }],
    ["meta", { property: "og:image", content: "" }],
    ["meta", { property: "og:url", content: "" }],
    ["meta", { property: "og:description", description }],
    ["meta", { name: "description", description }],
    ["meta", { name: "author", content: "AlbertYang" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
      },
    ],

    ["meta", { name: "keywords", description }],
    // ["meta", { name: "baidu-site-verification", content: "codeva-GdK2q9MO1i" }], // 百度收录
    // ["meta", { name: "msvalidate.01", content: "48CABE70F538B8D117567176ABF325AF" }], // Bing 收录验证
    //网站流量统计服务  https://v6.51.la/report/overview?comId=3076464
    ["script", { charset: "UTF-8", id: "LA_COLLECT", src: "//sdk.51.la/js-sdk-pro.min.js" }], // 51.la
    [
      "script",
      {},
      `typeof LA !== 'undefined' && LA.init({ id: "3MqJc1haAfZrIrqZ", ck: "3MqJc1haAfZrIrqZ", hashMode: true })`,
    ], // 51.la
  ],
  markdown: {
    // 开启行号
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
    // 更改容器默认值标题
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  sitemap: {
    hostname: "https://vp.teek.top",
    transformItems: items => {
      const permalinkItemBak: typeof items = [];
      // 使用永久链接生成 sitemap
      const permalinks = (globalThis as any).VITEPRESS_CONFIG.site.themeConfig.permalinks;
      items.forEach(item => {
        const permalink = permalinks?.map[item.url];
        if (permalink) permalinkItemBak.push({ url: permalink, lastmod: item.lastmod });
      });
      return [...items, ...permalinkItemBak];
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/bird.svg",
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新时间",
    outline: {
      level: [2, 4],
      label: "本页导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    nav: navConfig,
    sidebar: sidebarConfig,
    socialLinks: [{ icon: "github", link: "https://github.com/AlbertYang0801" }],

    search: {
      provider: "local",
    },
    // editLink: {
    //   text: "在 GitHub 上编辑此页",
    //   pattern: "https://github.com/Kele-Bingtang/vitepress-theme-teek/edit/master/docs/:path",
    // },
  },
});
