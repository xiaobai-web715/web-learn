import {ChromeEventType, getEventHandler} from "./chomeEventMap"
const handleBackgroundToMessage = <T>(needInfo: T) => {
    chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
        const {type, data}: {type:ChromeEventType, data: any } = message
        const messageHandle = getEventHandler(type)
        messageHandle(message, sender, sendResponse, needInfo)
    })
}

export default handleBackgroundToMessage