# 制作Tomcat镜像

### DockerFile文件内容

- tomcat 基础镜像
  
    ```bash
    
    # 使用基于 JDK 8 的官方 Tomcat 镜像作为基础镜像
    FROM tomcat:8-jdk8
    
    # 修改默认的 shell
    RUN ln -sf /bin/bash /bin/sh
    
    # 暴露 Tomcat 的默认 HTTP 端口
    EXPOSE 8080
    
    # 设置容器启动时执行的命令
    CMD ["catalina.sh", "run"]
    ```
    
- 应用镜像
  
    ```bash
    FROM tomcat-apm
    
    COPY bookdemo.war /usr/local/tomcat/webapps/
    COPY show-busy-java-threads /usr/local/tomcat/
    
    # 设置容器启动时执行的命令
    CMD ["catalina.sh", "run"]
    
    ```
    

### 安装命令

- build 镜像
  
    ```
    docker build -t tomcat-demo.
    ```
    
- run 镜像
  
    ```
    docker run -d -p 8080:8080 tomcat-demo
    ```