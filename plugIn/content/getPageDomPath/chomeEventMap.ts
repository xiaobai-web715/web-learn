import {Info} from './index'
import { getEleStruc } from '@/utils/domOptions';
const canModifyDomStyle = (message: any, sender: chrome.runtime.MessageSender, sendResponse: ((response?: any) => void), needInfo: Info) => {
    console.log("我是传递过来的消息", message, needInfo)
    if (needInfo && needInfo.dom) {
        (needInfo.dom as HTMLElement).style.border = '10px solid red';
        const targetDomPath = getEleStruc(needInfo.dom as HTMLElement)
        console.log("我是当前获取的dom的路径", targetDomPath)
        sendResponse({
            type: 'success',
            domPath: targetDomPath
        })
    } else {
        sendResponse({
            type: 'fail',
            domPath: ''
        })
    }
}
type MessageHandle = (
    message: any, 
    sender: chrome.runtime.MessageSender, 
    sendResponse: ((response?: any) => void),
    needInfo: any
) => void
export enum ChromeEventType {
    TRIGGER_ACTION = "trigger-action"
}

export const chromeEvent: Record<ChromeEventType, MessageHandle> = {
    [ChromeEventType.TRIGGER_ACTION]: canModifyDomStyle
}

export const getEventHandler = (type: ChromeEventType): MessageHandle => {
    return chromeEvent[type]
}
