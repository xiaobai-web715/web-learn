export const postMessageToTab = async <T>(tabId: number, message: T, fn: (response: Record<string, any>) => void) => {
    await chrome.tabs.sendMessage<T, Record<string, any>>(tabId, message, fn)
}