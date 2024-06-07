import { getEleStruc } from '@/utils/domOptions';
import MessageBusInfo from './messageBusInfo';
const canModifyDomStyle = (message: any, sender: chrome.runtime.MessageSender, sendResponse: ((response?: any) => void), needInfo: MessageBusInfo) => {
    if (needInfo && needInfo.dom) {
        needInfo.dom.classList.add('hit');
        const targetDomPath = getEleStruc(needInfo.dom as HTMLElement)
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
