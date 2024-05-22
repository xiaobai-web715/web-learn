import { ChromeEventType } from "@/content/getPageDomPath/chomeEventMap"

export interface MessageInfo<T> {
    type: ChromeEventType,
    data: T
}
export interface ResponseInfo<T> {
    type: "success" | "fail",
    data: T
}
export const postMessageToTab = async <T, D>(tabId: number, message: MessageInfo<T>, fn: (response: ResponseInfo<D>) => void) => {
    await chrome.tabs.sendMessage<MessageInfo<T>, ResponseInfo<D>>(tabId, message, fn)
}