# HTTP常见字段

```json
POST /apmServer-sl/sys-user/login HTTP/1.1
Accept: application/json, text/plain, */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Authorization: clusterid34
Connection: keep-alive
Content-Length: 101
Content-Type: application/json
Cookie: apm.name=admin
Host: 10.10.103.37:39910
Origin: http://10.10.103.37:39910
Referer: http://10.10.103.37:39910/
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36
X-Auth-Token:
```

### Content-length

包响应的字节长度。由于TCP协议是基于字节传输的，发一次包可能包含多次请求的数据。所以需要根据请求返回数据长度设置边界。这是 TCP 粘包问题。

- HTTP协议通过设置回车符和换行符作为HTTP Header的边界。
- 根据 Content-length 字段确认 HTTP body 的边界。

这两种方式都是为了解决 粘包的问题。

![image.png](https://s2.loli.net/2025/07/17/efap9jux4JnI1UL.png)

### Connection

```json
Connection: keep-alive
```

Connection 支持的是 HTTP 长连接机制。

当客户端请求头部带有 `[Connection: keep-alive](Connection: keep-alive)`时，意味着客户端要保持对服务端的长连接。如果一方不主动断开，则该连接一直保有。 后续请求也可以复用该连接。

![image.png](https://s2.loli.net/2025/07/17/INAkZp9FLvxeC6P.png)

HTTP 长连接的特点是，只要任意一端没有明确提出断开连接，则保持 TCP 连接状态。

![image.png](https://s2.loli.net/2025/07/17/cHzmZwfXMTCJ7AP.png)

### Content-Type 和 Accept

```json
Accept: application/json, text/plain, */*Content-Type: application/json
```

![image.png](https://s2.loli.net/2025/07/17/UWYdXgQ8HyonAC5.png)

- Accept 表示客户端可以接收的数据格式。
- Content-Type 表示服务端返回数据的格式。