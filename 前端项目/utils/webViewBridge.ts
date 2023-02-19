// 这里是与app交互或者与本地模拟交互的方式
((win) => {
    const send = <T>(message: messageI, callback : T) => {
        window.console && window.console.log(JSON.stringify(message));
        // 这里先通过本地的测试通信模拟情况
        window.WebViewBridgeNativeEmulator && window.WebViewBridgeNativeEmulator.onMessage(message);
    };
    console.log('win', win);
    win.webViewBridge = {
        send: send
    };
})(window);