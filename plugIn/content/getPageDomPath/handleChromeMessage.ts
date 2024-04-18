import {ChromeEventType, getEventHandler} from "./chomeEventMap"
import {Info} from "./index"
const handleChromeMessage = <T>(needInfo: T) => {
    chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
        console.log("我是传递过来的请求信息", message)
        const {type, data}: {type:ChromeEventType, data: any } = message
        const messageHandle = getEventHandler(type)
        messageHandle(message, sender, sendResponse, needInfo)
        // if (chromeEvent[type]) {
        //     chromeEvent[type](message, sender, sendResponse, needInfo)
        //     console.log("我是响应监听事件的时候所传递进来的信息", needInfo)
        // }
    })
}

export default handleChromeMessage