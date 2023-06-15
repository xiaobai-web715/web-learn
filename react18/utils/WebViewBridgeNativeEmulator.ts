((win) => {
    if (parent === win) {
        console.log('parent', parent);
    }
    const onMessage = () => {
        parent.postMessage;
    };
    win.WebViewBridgeNativeEmulator = {
        onMessage: onMessage
    };
})(window);