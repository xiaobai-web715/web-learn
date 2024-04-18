import handleChromeMessage from "./handleChromeMessage"
export interface Info {
    dom: EventTarget | null
}
const needInfo:Info = {dom: null}
handleChromeMessage<Info>(needInfo) //注册监听的事件命令

document.addEventListener('mousemove', (event) => {
    const x = event.clientX; // 获取鼠标相对于视口的X坐标
    const y = event.clientY; // 获取鼠标相对于视口的Y坐标
    const elementUnderMouse = document.elementFromPoint(x, y);
    console.log(elementUnderMouse); // 打印当前鼠标下的元素
    needInfo.dom = elementUnderMouse
    console.log("我是想要的目标dom", needInfo)
});
console.log("我是注册的事件监听")