import { ChromeEventType } from "@/content/getPageDomPath/chomeEventMap"

export interface MessageInfo<T> {
    type: ChromeEventType,
    data: T
}
export const postMessageToTab = async <T>(tabId: number, message: MessageInfo<T>, fn: (response: Record<string, any>) => void) => {
    await chrome.tabs.sendMessage<MessageInfo<T>, Record<string, any>>(tabId, message, fn)
}