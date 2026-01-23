import MessageBusInfo from "./messageBusInfo";

function addResEvent (needInfo: MessageBusInfo) {
    document.addEventListener('mousemove', (event) => {
        const x = event.clientX; // 获取鼠标相对于视口的X坐标
        const y = event.clientY; // 获取鼠标相对于视口的Y坐标
        const elementUnderMouse = document.elementFromPoint(x, y);
        // console.log("elementUnderMouse", elementUnderMouse, needInfo.dom, elementUnderMouse === needInfo.dom)
        if (elementUnderMouse !== needInfo.dom && needInfo.dom) {
            needInfo.dom.classList.remove('float_needPosition', 'float_noNeddPosition')
        }
        if (elementUnderMouse) {
            const currentPosition = window.getComputedStyle(elementUnderMouse).position
            if (currentPosition == 'static') {
                elementUnderMouse?.classList.add('float_needPosition')
            } else {
                elementUnderMouse?.classList.add('float_noNeddPosition')
            }
        }
        needInfo.dom = elementUnderMouse
    });
}

export default addResEvent