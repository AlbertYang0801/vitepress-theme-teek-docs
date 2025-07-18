# 容器新增bash

### 安装方式

- wget 下载
  
    ```bash
    from busybox
    
    # 下载 bash 二进制文件
    RUN wget -O /bin/bash http://ftp.gnu.org/gnu/bash/bash-5.1.tar.gz
    
    # 设置可执行权限
    RUN chmod +x /bin/bash
    
    # 运行命令
    CMD ["echo", "Hello, World!"]
    ```
    
- 本地安装
  
    ```bash
    from busybox
    
    # 复制 bash 二进制文件到 /bin/bash 目录
    COPY bash-5.1.8.tar.gz  /bin/bash
    
    # 设置可执行权限
    RUN chmod +x /bin/bash
    
    # 运行命令
    CMD ["echo", "Hello, World!"]
    
    ```
    

一般基于 busybox 的镜像是不包含 bash 的，所以需要手动安装。

### 测试效果：

- 不安装 bash 的效果：
  
    ![image.png](https://s2.loli.net/2025/07/14/fJ9InANg2qF5QMi.png)
    
- 安装之后的效果：
  
    ![image.png](https://s2.loli.net/2025/07/14/awkjLQrMnCpD51N.png)
    

---

##  安装命令

![image.png](https://s2.loli.net/2025/07/14/kNe2RqHwTbf8sKX.png)

```bash
RUN wget https://ftp.gnu.org/gnu/bash/bash-5.1.tar.gz && \
    tar -xzf bash-5.1.tar.gz && \
    cd bash-5.1 && \
    ./configure && \
    make && \
    make install
```

[Index of /gnu/bash](https://ftp.gnu.org/gnu/bash/)