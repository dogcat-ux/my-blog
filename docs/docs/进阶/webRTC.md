https://webrtcforthecurious.com/zh/docs/06-media-communication/

## WebRTC 是什么？ [#](https://webrtcforthecurious.com/zh/docs/01-what-why-and-how/#webrtc-是什么)

WebRTC 是 Web 实时通信（Real-Time Communication）的缩写，它既是 API 也是协议。WebRTC 协议是两个 WebRTC Agent 协商双向安全实时通信的一组规则。开发人员可以通过 WebRTC API 使用 WebRTC 协议。目前 WebRTC API 仅有 JavaScript 版本。

可以用 HTTP 和 Fetch API 之间的关系作为类比。WebRTC 协议就是 HTTP，而 WebRTC API 就是 Fetch API。

除了 JavaScript 语言，WebRTC 协议也可以在其他 API 和语言中使用。你还可以找到 WebRTC 的服务器和特定领域的工具。所有这些实现都使用 WebRTC 协议，以便它们可以彼此交互。

WebRTC 协议由 IETF 工作组在[rtcweb](https://datatracker.ietf.org/wg/rtcweb/documents/)中维护。WebRTC API 的 W3C 文档在[webrtc](https://www.w3.org/TR/webrtc/)。

## WebRTC 协议是一组其他技术的集合体 [#](https://webrtcforthecurious.com/zh/docs/01-what-why-and-how/#webrtc-协议是一组其他技术的集合体)

这个主题需要整本书来解释。但是，首先，我们将其分为四个步骤。

- 信令（Signaling）
- 连接（Connecting）
- 安全加密（Securing）
- 通信（Communicating）

这四个步骤依次发生。上一个步骤必须 100％成功，随后的步骤才能开始。

1. 信令：peer 如何在 WebRTC 中找到彼此（双方是什么格式）

当 WebRTC Agent 启动时，它不知道与谁通信以及他们将要通信的内容。信令解决了这个问题！信令用于引导呼叫，以便两个 WebRTC Agent 可以开始通信。

信令使用一种现有的协议 SDP（会话描述协议）。SDP 是一种纯文本协议。每个 SDP 消息均由键 / 值对组成，并包含“media sections（媒体部分）”列表。两个 WebRTC Agent 交换的 SDP 所包含一些详细信息，如：

- Agent 可供外部访问的（候选的）IP 和端口。
- Agent 希望发送多少路音频和视频流。
- Agent 支持哪些音频和视频编解码器。
- 连接时需要用到的值（`uFrag`/`uPwd`）。
- 加密传输时需要用到的值（证书指纹）。

注意，信令通常发生在“out-of-band”。也就是说，**应用通常不使用 WebRTC 本身来交换信令消息。在连接的 peer 中，任何适合发送消息的架构均可被用于传递 SDP 信息，许多应用程序都使用其现有的基础设施（例如 REST 端点，WebSocket 连接或身份验证代理）来解决适当客户端之间的 SDP 传递问题。**（也就是说信令这种SDP是基础，但是通常用现有的框架）



2. 连接：使用 STUN/TURN 进行连接和 NAT 穿透（双方如何通信）

现在，两个 WebRTC Agent 知道足够的详细信息以尝试相互连接。接下来，WebRTC 将使用另一种成熟的技术，称为 ICE。

ICE（交互式连接建立）是 WebRTC 前现有的协议。ICE 允许在两个 Agent 之间建立连接。这些 Agent 可以在同一网络上，也可以在世界的另一端。ICE 是无需中央服务器即可建立直接连接的解决方案。

这里真正的魔法是“ NAT 穿透”和 STUN/TURN 服务器。这两个概念是与另一个子网中的 ICE Agent 进行通信所需的全部。稍后我们将深入探讨这些主题。

ICE 成功连接后，WebRTC 就会继续建立加密传输。加密传输用于音频，视频和数据。



3. 安全加密：使用 DTLS 和 SRTP 加密传输层（双方如何安全通信）

现在我们有了双向通信（基于 ICE），我们需要建立安全的通信。这是基于 WebRTC 前已有的两种协议完成的。第一个协议是 DTLS（数据报传输层安全性），即基于 UDP 的 TLS。TLS 是一个加密协议，用于保护基于 HTTPS 的安全通信。第二种协议是 SRTP（安全实时传输协议）。

首先，WebRTC 通过在 ICE 建立的连接上进行 DTLS 握手来进行连接。与 HTTPS 不同，WebRTC 不使用中央授权来颁发证书。相反，WebRTC 只是判断通过 DTLS 交换的证书是否与通过信令共享的签名相符。然后，此 DTLS 连接可以被用于传输 DataChannel 消息。

接下来，WebRTC 使用 RTP 协议进行音频 / 视频的传输。我们使用 SRTP 来保护我们的 RTP 数据包。我们从协商的 DTLS 会话中提取密钥，用来初始化 SRTP 会话。在后续章节中，我们会讨论为什么媒体传输需要有它自己的协议。

现在我们完成了！你现在可以进行安全的双向通信。如果你的 WebRTC Agent 之间具有稳定的连接，以上这些就是你可能需要解决的所有复杂问题了。不幸的是，现实世界中存在数据包丢失和带宽限制等问题，下一节我们会介绍如何处理这些问题。



4. 通信：通过 RTP 和 SCTP 进行点对点通信（开始通信）

现在，我们有了两个具有安全的双向通信功能的 WebRTC Agent。让我们开始通信！跟前面一样，我们使用两个现有的协议：RTP（实时传输协议）和 SCTP（流控制传输协议）。我们使用 RTP 来交换用 SRTP 加密过的媒体数据，使用 SCTP 发送和接收那些用 DTLS 加密过的 DataChannel 消息。

RTP 很轻量，但是提供了实现实时流式传输所需的功能。最重要的是，RTP 为开发人员提供了灵活性，因此他们可以根据需要来处理延迟，丢失和拥塞。我们将在媒体章节中对此进行进一步讨论。

协议栈中的最后一个协议是 SCTP。SCTP 支持许多不同的消息传送选项。你可以根据需要开启不可靠传输，无序传输等选项，以便获得实时系统所需的低延迟。

WebRTC 是一系列协议的集合：



![image-20230426190807155](/Users/huangqiaoli/Library/Application Support/typora-user-images/image-20230426190807155.png)



