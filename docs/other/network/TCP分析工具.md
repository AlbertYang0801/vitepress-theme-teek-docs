# TCP分析工具

[Wireshark · Go Deep](https://www.wireshark.org/#)

![image.png](https://s2.loli.net/2025/07/17/RLz9ubQxwE8noWc.png)

## 三次握手

![image.png](https://s2.loli.net/2025/07/17/JUVnyO5mlLwF4QK.png)

### 第1次握手

![image.png](https://s2.loli.net/2025/07/17/3I6KsA1fqvTWtlO.png)

syn设置为1，表明这是一个 SYN包

![image.png](https://s2.loli.net/2025/07/17/3H87xVfCnlsvrz9.png)

**seq = 1390201126**

![image.png](https://s2.loli.net/2025/07/17/K1IpQ72Ew5xgnGO.png)

### 第2次握手

syn=1 同时 ACK=1，表明这是一个 SYN/ACK包

![image.png](https://s2.loli.net/2025/07/17/ESk7BazKjd8CLvy.png)

服务端返回的 ACK = **客户端第一次发送的 seq+1** = **1390201126+1**

同时服务端向客户端返回了自己的 seq（如果第三次握手客户端返回的ack=seq+1，代表客户端收到了自己发的seq）

> 也就是说第三次握手发来的ack应该等于 522897289
> 

![image.png](https://s2.loli.net/2025/07/17/OQnLYrXCple2h7b.png)

### 第3次握手

可以看到第 3 次握手的 ack=第2次握手seq+1

![image.png](https://s2.loli.net/2025/07/17/qdYuPENHvk5bw7a.png)

ack=1，可以看出来这是一个 ACK 请求。

![image.png](https://s2.loli.net/2025/07/17/andOBqMHhioxZX7.png)

## 四次挥手

![image.png](https://s2.loli.net/2025/07/17/voHlKtFiEx5CNkj.png)

![image.png](https://s2.loli.net/2025/07/17/shtNyjMwHESF3iX.png)

可以看到四次挥手的过程

- FIN、ACK
- ACK
  
    服务端返回给客户端ACK之后，此时不接收客户端发来的数据。但是服务端可以把剩余数据发给客户端。
    
    等发送完毕之后，再通知客户端。
    
- FIN、ACK
  
    客户端经过 MSL 时间后进入 CLOSED 状态。
    
- ACK
  
    服务端收到之后进入 CLOSED 状态，即断开连接。
    

![image.png](https://s2.loli.net/2025/07/17/dq3xLHf2SD874tz.png)