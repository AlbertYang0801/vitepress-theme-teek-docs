# docker镜像压缩

## tar包

![image.png](https://s2.loli.net/2025/07/14/zVFWME9SYmDhwkJ.png)

```
docker save tomcat-apm-0915 -o ./tomcat-apm-0915.tar
```

```
docker load < tomcat-apm-0915.tar
```

[Docker 复制镜像到其他主机 - 彦祚 - 博客园](https://www.cnblogs.com/aldshengdeng/p/12966393.html)

## tar.gz包

### 保存镜像

`docker save <myimage>:<tag> | gzip > <myimage>_<tag>.tar.gz`

```
docker save xxx:xxx| gzip>xxx.tar.gz
```

### 加载镜像

`gunzip -c <myimage>_<tag>.tar.gz | docker load`