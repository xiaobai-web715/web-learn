(() => {
    console.log("添加popstate事件监听方法");
    window.addEventListener('popstate', () => {
        console.log("监听浏览器前进后退的执行");
    });
})();