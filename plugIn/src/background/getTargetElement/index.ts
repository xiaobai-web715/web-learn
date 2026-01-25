import { ChromeEventType } from "@/content/getPageDomPath/chomeEventMap";
import { postMessageToTab } from "@/utils/chromeMessage"
import ChromeStorage from "@/utils/chromeStorage";
import { ChromeStorageEnum } from '@/utils/chromeStorage'
import CryptoJS from "crypto-js"
interface Trigger {
    showEle: boolean
}
interface DomPathInfo {
    domPath: string
}
const pk = '呀哈哈'
chrome.commands.onCommand.addListener(function (command) {
    if (command === 'trigger-action') {
        // console.log('全局快捷键 Ctrl+Shift+Y 被触发');
        // 执行相应的操作
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0]
            postMessageToTab<Trigger, DomPathInfo>(
                currentTab.id as number,
                {
                    type: ChromeEventType.TRIGGER_ACTION,
                    data: {
                        showEle: true
                    }
                },
                async (response) => {
                    const { type, data } = response;
                    const { domPath } = data;
                    const removeTrim = domPath.replace(/^\s+|\s+$/g, '')
                    if (type == 'success' && removeTrim) {
                        // 将dom的链接信息保存到数据库当中
                        const elementPathInfo = await ChromeStorage.getItem(ChromeStorageEnum.ELEMENT_PATH) || []
                        const data = elementPathInfo.length + pk
                        const hash = CryptoJS.SHA256(data).toString()
                        elementPathInfo.push(
                            {
                                domPath,
                                key: hash,
                                name: ''
                            }
                        )
                    }
                }
            )
        })
    }
});