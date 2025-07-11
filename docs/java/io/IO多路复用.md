# IO多路复用

[小白也看得懂的 I/O 多路复用解析（超详细案例）_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1r54y1f7bU/?spm_id_from=333.337.search-card.all.click&vd_source=e98aef20b1bd281c1b564fb64680bdbc)

## 基础概念

![](https://s2.loli.net/2025/05/29/ZFcCgP9ytOh4mTi.png)

1. Socket

   套接字，在网络通信中，就是客户端和服务端的出入口。

   > 套接字看作不同主机间的进程进行双间通信的端点。是计算机之间进行通信的一种约定或一种方式，用于描述IP地址和端口。
>
2. fd

   文件描述符，是指向资源文件的索引。


### Socket通讯的过程

![](https://s2.loli.net/2025/05/29/qsfa1ncBJWr47Xw.png)

1. 服务端通过 bind 绑定机器的端口号， 进程 listen 某个端口。
2. 客户端和服务端通过 tcp 三次握手建联。
3. 进行数据交互，
4. 最后通过 close 断开连接。

## IO模型

![](https://s2.loli.net/2025/05/29/inahdX3PRfgQBT7.png)

### 同步阻塞IO - BIO

- 单线程

  单线程情况下，Socket 会阻塞其它 Socket，直到 当前 Socket 结束。

- 多线程

  多线程情况下，假如每个客户端分一个线程，容易造成资源浪费。

  比如不同时刻就绪的四个 Scoket，原本一个线程就能执行完。

  ![](https://s2.loli.net/2025/05/29/qGUzi3YOZyQJ92p.png)


### 同步非阻塞IO - NIO

> 阻塞 IO 在处理多个 Scoket 时，如果当前 Socket 无数据发送，会一直等待。
>

而非阻塞 IO 就是操作系统为了解决阻塞问题做出的优化。

---

非阻塞 IO 在处理多个 Socket 时，如果当前 Socket 无数据到达，会继续检查下一个 Socket。**不会阻塞在当前 Socket**。

![](https://s2.loli.net/2025/05/29/WJK8qzUoHr7Qjap.png)

当前 Socket 数据到达之后，进行数据交互。

> 数据处理也可以采用异步方式，即开启一个新线程去处理该 Socket 请求。主线程继续判断其它 Socket。
>

![](https://s2.loli.net/2025/05/29/Trnk7xXsRIKw2CU.png)

### 优缺点

- 优点

  解决了Socket 阻塞问题。

- 缺点

  需要不停的轮询，过程中的系统调用、用户态和系统态的切换都是不小的开销。

  > read 函数 从用户态将 fd 拷贝到内核态。
>

## IO多路复用

多路复用就是使用`一个或一组线程（线程池）处理多个TCP连接`。

- select/poll/epoll 核心是可以同时处理多个connection，而不是更快，所以连接数不高的话，性能不一定比多线程+阻塞IO 好。

### select

为了解决用户态和内核态的频繁切换，select 函数将 fd 整体拷贝到内核态，在内核态进行轮询。

而轮询过程select 函数是阻塞的，直到以下条件达成。

1. 有监测事件发生，此时select函数返回大于0的值。
2. 超时，此时select函数返回0。
3. select函数发生错误，此时返回-1。

![](https://s2.loli.net/2025/05/29/VU852b9NovWFqth.png)

使用 fd_set 表示监听的文件 fd。

![](https://s2.loli.net/2025/05/29/sfCeluJjg9WpxQi.png)

**fd_set**

- 入参

  指定需要监听的 fd，数据长度限制了监听的 fd 个数。

- 出参

  直接修改指定位上的值，表示该位代表的 fd 是否就绪。


![](https://s2.loli.net/2025/05/29/Y7tedJvkwg5b4xz.png)

![](https://s2.loli.net/2025/05/29/Oyqxw4SrIGgmNs8.png)

> 核心就是将事件就绪检查逻辑整体放到内核态，减少系统调用。
>

检查完成之后返回就绪的事件数量，但是没有返回是哪个 fd。

使用select函数进行 IO 请求和 同步阻塞模型 没有太大的区别，甚至还多了添加监视socket，以及调用select函数的额外操作，效率更差。

但是，使用select以后最大的优势是用户可以**在一个线程内同时处理多个socket的IO请求**。用户可以注册多个socket，然后不断地调用select读取被激活的socket，即可**达到在同一个线程内同时处理多个IO请求的目的**。而在同步阻塞模型中，必须通过多线程的方式才能达到这个目的。

**缺点**

- 不知道具体哪个 fd 就绪，需要遍历。
- 单进程监听的 fd 有限制，默认 1024。

  这里的限制跟入参fd_set 的长度有关系（默认 1024）

- 入参的 fd_set 每次调用都被重置。

  使用位图作为数据结构，出参是在入参基础上修改的。所以每次调用都需要重置 fd_set。


### poll

由于 select 的 fd_set 带来的缺点，poll 针对缺点进行了优化。

![](https://s2.loli.net/2025/05/29/VdU9JE1t7MHipZB.png)

入参取消 fd_set，改为可以复用的 pollfd。

> 可以看到 pollfd 里面包含了fd、监听的事件和就绪的事件，这样再重复调用的时候就不需要重置参数。
>

而且 pollfd 作为集合，拷贝到内核态之后是`链表`形式，所以是没有长度限制的。

![](https://s2.loli.net/2025/05/29/rH2zRcsV6YkOx5d.png)

`poll 和 select整体对比，其实就是改变了入参，避免了 fd 限制和重置问题。`

但是 poll 还是遗留了两个问题。

- 每次需要将 fd 从用户态拷贝到内核态。
- 检测成功后不知道具体就绪的 fd，需要遍历全部的 fd。

### epoll

epoll 就是针对 select 和 poll 的优化，解决 poll 遗留的两个问题。

通过 红黑树 + 链表 + 回调函数解决。

![](https://s2.loli.net/2025/05/29/eZFLQ4fiDGndmYH.png)

![](https://s2.loli.net/2025/05/29/OhbymDL8VIKcHsr.png)

### epoll_create

当进程调用 `epoll_create`时候，内核会创建 `eventpoll`结构体。

![image-20250529185122163](https://s2.loli.net/2025/05/29/c5EaZVeRKM79Nur.png)

- eventpoll

  每个epoll实例有自己的 eventpoll 实例。

    - rbr

      红黑树，保存需要监控的 fd。

    - rdlist

      双向链表，存放就绪的 fd。


    ```
    struct eventpoll{
    ....
    /*红黑树的根节点，这颗树中存储着所有添加到epoll中的需要监控的事件*/
    struct rb_root rbr;            //红黑树的根节点
    /*双链表中则存放着将要通过epoll_wait返回给用户的满足条件的事件*/
    struct list_head rdlist;     //双向列表的头结点
    ....
    };
    
    ```


### epoll_ctl

将需要监听的文件描述符进行注册，内核会为这次动作构建一个红黑树的节点，并插入到红黑树中；

将需要监听的 fd 进行注册，生成 epitem 并添加到 rbr（红黑树）中。

![image-20250529185057235](https://s2.loli.net/2025/05/29/ufkpwWAtgbY7NU4.png)

```
struct epitem{

  struct rb_node rbn;//红黑树节点
  struct list_head rdllink;//双向链表节点
  struct eventpoll *ep; //指向其所属的eventpoll对象

  pwqlist; //回调函数

}

```

将 fd 写入到 rbr 之后，**内核会为 epitem 设置回调函数**。

> 内核会为这个 fd 与网卡驱动程序建立回调关系，当事件就绪时，会调用已经建立好的回调方法。这个回调方法会将发生的事件添加到就绪链表中；
>

通过客户端发来的数据包通过网卡驱动找到对应的 epitem，然后进行操作。

![image-20250529185046741](https://s2.loli.net/2025/05/29/6Upnt482fNASsMG.png)



### epoll_wait

epoll_wait 会检查就绪列表里的事件。

- 就绪列表不为空

  **有就绪事件，将事件拷贝到用户态进行处理。**

- 就绪列表为空

  将 epoll 进程放到 eventpoll （epoll 实例）的等待队列中，让出 CPU
  。（等待 epitem 对应的回调函数唤醒）


![](https://s2.loli.net/2025/05/29/yAZwCvEm5Y1rqkN.png)

通过客户端发来的数据找到对应的 epitem 之后，执行 epitem 的回调函数。执行过程会唤醒 eventpoll 等待队列中的epoll 进程，然后 添加到就绪队列。最后 epoll_wait获取就绪事件。

![](https://s2.loli.net/2025/05/29/FkAfNbrxORjmwHK.png)

`在高并发场景下，epoll_wait 检查就绪队列，就绪事件会很多并且非常快。`

![](https://s2.loli.net/2025/05/29/2fdvV7qPSBGDeRU.png)

- 避免了每次都需要将 fd 从用户态拷贝到内核态，epoll 只需要在注册事件的时候拷贝一次。
- 不需要遍历所有 fd来找到就绪 fd，通过 epoll_wait 检查就绪队列可以直接找到就绪的 fd。

### epoll的工作方式

- 水平触发（LT）

  **LT 是 epoll 默认的通知方式。**

  epoll_wait 检测到事件就绪后，后续的 epoll_wait 继续检测到该事件后，该事件未完成，会继续发通知。

  这样 epoll_wait 的通知次数会增多，性能比 ET 低，但是更可靠。

- 边缘触发（ET）

  ET 是只在第一次监测到时间的时候通知，之后不再通知。epoll_wait 通知次数少，性能更高。

  ![](https://s2.loli.net/2025/05/29/uwsWq8tyal9XAdp.png)
    

