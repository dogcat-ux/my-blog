实习/工作过程中接触过很多代理的工具，软件，也进行过很多代理操作。相关方面的知识也不断累积，今天基于charles进行https代理的解析。

## 一. 代理工具

工作中接触过的代理工具有最出名的charles，whistle，公司自研代理工具，Proxy SwitchyOmega插件等等。

首先讲一下基础的区别

### charles

### whistle

### Proxy SwitchyOmega

## 二. 代理http



## 三. 代理https，以charles为例

使用过charles的同学应该都知道使用charles需要配置一堆证书并开启信任证书等繁琐的操作，但其实明白了其中的原理之后，这些操作其实都很简单。首先简单介绍一下配置流程：

### Charles配置流程及讲解

#### pc端（Mac）

1. 下载[Charles](https://www.charlesproxy.com/latest-release/download.do)

2. [charles破解](https://www.zzzmode.com/mytools/charles/)链接点进去后生成**Registered Name**和**License Key**，然后打开charles点击help点进去register，然后把**Registered Name**和**License Key**粘贴进去，然后重启Charles

   ![image-20230729023845747](/Users/huangqiaoli/Library/Application Support/typora-user-images/image-20230729023845747.png)

   = 

 3. 然后目前charles只能拦截http请求，拦截https请求的话在charles中目前看到的是乱码的请求

 4. 点击help之后如图操作，点击SSL Proxying，然后点击install Charles Root Certificate

    ![image-20230729024154243](/Users/huangqiaoli/Library/Application Support/typora-user-images/image-20230729024154243.png)

5. 然后点击证书

   

#### 移动端（ios）

1. 移动端代理首先要先让移动端和pc端在一个局域网内（就是连同一个wife，或者电脑连接这个手机的热点），同一个局域网内手机端可以直接通过电脑ip:端口号访问到pc端的localhost环境，实现局域互通
2. 然后把网络代理到charles上，ios的话可以
   1. charles这个进程其实本身就启动在我们本地的8888端口（可以改）上，相当于127.0.0.1:8888这个host是charles在用
   2. charles拦截我们的网络请求的原理就是 把我们的正常请求代理到 **pc端127.0.0.1:8888**这个地址（charles老家）上，然后charles作为中间商就可以查看经过它的那些请求包，然后charles再把这些发送给原本的目标地址上
3. 

### 如此配置的原因



### https流程

在配置过程中之所以需要下载charles的证书并且设置我们的设备信任这些证书的原因，是因为https传输的流程

基于https协议传输数据包的流程其实跟基于http协议传输数据包的流程一样，但是https在http的基础上加了一层SSL层

什么是SSL层呢？



https之所以需要



## 四. 梯子的原理

### clashX

### V2rayU













