import { ChromeEventType } from "root/types"
import { sendMessage } from "webext-bridge/content-script"

window.addEventListener('message', function (e) {
    if (e.data.type === ChromeEventType.GETRequestURL) {
        sendMessage(ChromeEventType.GETRequestURL, e.data.data, 'background')
    }
})