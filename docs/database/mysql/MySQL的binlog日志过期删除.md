# MySQL的binlog日志过期删除

## 问题

mysql的binlog日志过多导致磁盘告警。

部署脚本中没有配置 `binlog` 的失效时间，默认是30天。

## 手动清理

1. 查看正在使用的binlog
   
    ```sql
    show master status
    ```
    
2. 删除指定binlog之前的所有binlog
   
    ```sql
    purge binary logs to 'bin.000055'
    ```
    

## 配置自动清理

### 查看日志过期时间

```sql
show variables like '%expire_logs%'
```

| Variable | Value |
| --- | --- |
| binlog_expire_logs_seconds | 2592000 |
| expire_logs_days | 0 |
- `binlog_expire_logs_seconds`
  
    8.x 版本之后支持该参数，单位秒。
    
- `expire_logs_days`
  
    单位天。
    

### 修改my.cnf 配置文件

- 8.x版本
  
    `Plain Text   binlog_expire_logs_seconds=172800`
    
    ![image-20250711174815459](https://s2.loli.net/2025/07/11/jqfxbT8DQA1msWg.png)

### 重启MySQL服务

```
systemctl restart mysqld
```

## 参考链接

[Mysql设置binlog过期时间并自动删除 - 走看看](http://t.zoukankan.com/jimoliunian-p-13896409.html)