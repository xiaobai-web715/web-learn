chrome.webNavigation.onCommitted.addListener((details) => {
    chrome.scripting.executeScript({
        target: {
            tabId: details.tabId, // 当前的tab
            allFrames: true // 指定脚本在所有Frame中执行
        },
        files: ['proxyRequest.iife.js'], // 要注入的js文件
        injectImmediately: true, // 需尽快注入到页面当中
        world: 'MAIN', // 与宿主网页共享js上下文执行环境
    }).then((res: any) => {
        console.log("js资源成功注入", res)
    }).catch((err: any) => {
        console.log("js资源注入失败", err)
    })
})