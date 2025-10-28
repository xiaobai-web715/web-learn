const { port1, port2 } = new MessageChannel();
port1.onmessage = (event) => {
    console.log("port1收到消息", event);
};
import React from "react";
const MessageChannelIndex = () => {
    function testEventLoop () {
        console.log("我是事件循环同步任务的开始");
        setTimeout(() => {
            console.log("我是setTimeout");
        }, 0);
        port2.postMessage("我是port2");
        console.log("我是事件循环同步任务的结束");
    }
    return (
        <div>
            <button onClick={testEventLoop}>开始</button>
        </div>
    );
};

export default MessageChannelIndex;