# Linux如何收发网络包

[2.3 Linux 系统是如何收发网络包的？](https://www.xiaolincoding.com/network/1_base/how_os_deal_network_package.html#linux-%E6%8E%A5%E6%94%B6%E7%BD%91%E7%BB%9C%E5%8C%85%E7%9A%84%E6%B5%81%E7%A8%8B)

## 网络协议栈

![image.png](https://s2.loli.net/2025/07/17/DKhZqVRS32X7JUl.png)

1. 应用程序需要通过系统调用，来和 Socket 进程数据交互。
2. Socket 层是介于应用层和传输层之间的抽象层。
3. 最下面的一层，则是网卡驱动程序和硬件网卡设备。

## Linux 接收和发送网络包的流程

![image.png](https://s2.loli.net/2025/07/17/sAI4r3uPyYg8bek.png)