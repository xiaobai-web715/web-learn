// 这里是与app交互或者与本地模拟交互的方式
((win: Window) => {
    const send = <T>(message: messageI, callback: T) => {
        window.console && window.console.log(JSON.stringify(message));
        console.log(callback)
        // 这里先通过本地的测试通信模拟情况
        window.WebViewBridgeNativeEmulator && window.WebViewBridgeNativeEmulator.onMessage(message);
    };
    win.webViewBridge = {
        send: send
    };
})(window);