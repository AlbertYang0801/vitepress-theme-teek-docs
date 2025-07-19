# vitepress源文件仓库

基于 vitepress-theme-teek 模板快速搭建。


## 模板地址

[vitepress-theme-teek主题](https://vp.teek.top/guide/quickstart.html)

## 使用注意

1. 切换博客风格
   
   TeekLayoutProvider 设置默认主题风格。
   
   ```
   // 默认文档风
   const currentStyle = ref("blog-card");
   const teekConfig = ref(teekBlogCardConfig);
   ```
   
   
   
1. 注释主题切换功能
   TeekLayoutProvider中注释部分代码。
   
    ```
   <template>
     <Teek.Layout>
   <!--    注释这部分切换主题-->
   <!--    <template #teek-theme-enhance-bottom>-->
   <!--      <div :class="[ns, 'flx-align-center']">-->
   <!--        <ConfigSwitch v-model="currentStyle" @switch="handleConfigSwitch" />-->
   <!--      </div>-->
   <!--    </template>-->
   
   <!--    <template #nav-screen-content-after>-->
   <!--      <ConfigSwitch v-model="currentStyle" @switch="handleConfigSwitch" />-->
   <!--    </template>-->
   
       <template #teek-archives-top-before>
         <ContributeChart />
       </template>
   
       <template #not-found>
         <NotFound />
       </template>
     </Teek.Layout>
   </template>
    ```
   
   