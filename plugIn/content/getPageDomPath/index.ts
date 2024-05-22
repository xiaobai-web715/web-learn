import handleChromeMessage from "./handleChromeMessage"
import loadFileToDoc from './loadFileToDoc'
export interface Info {
    dom: Element | null
}
let currentEle: Element | null = null
handleChromeMessage<Info>({dom: currentEle}) //注册监听的事件命令
loadFileToDoc() //加载文件

document.addEventListener('mousemove', (event) => {
    const x = event.clientX; // 获取鼠标相对于视口的X坐标
    const y = event.clientY; // 获取鼠标相对于视口的Y坐标
    const elementUnderMouse = document.elementFromPoint(x, y);
    console.log("elementUnderMouse", elementUnderMouse, currentEle, elementUnderMouse === currentEle)
    if (elementUnderMouse !== currentEle && currentEle) {
        currentEle.classList.remove('float_needPosition', 'float_noNeddPosition')
    }
    if (elementUnderMouse) {
        const currentPosition = window.getComputedStyle(elementUnderMouse).position
        if (currentPosition == 'static') {
            elementUnderMouse?.classList.add('float_needPosition')
        } else {
            elementUnderMouse?.classList.add('float_noNeddPosition')
        }
    }
    currentEle = elementUnderMouse
});