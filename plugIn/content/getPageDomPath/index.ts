import handleChromeMessage from "./handleChromeMessage"

handleChromeMessage() //注册监听的事件命令

document.addEventListener('mouseenter', (event) => {
    const targetDom = event.target;
    console.log("我是点击的dom", targetDom)
})