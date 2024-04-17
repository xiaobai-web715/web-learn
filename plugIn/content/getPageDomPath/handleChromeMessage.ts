import {ChromeEventType, chromeEvent} from "./chomeEventMap"
const handleChromeMessage = () => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        const {type, data} = message
        // chromeEvent[type as keyof ChromeEventType](message, sender, sendResponse)
    })
}

export default handleChromeMessage