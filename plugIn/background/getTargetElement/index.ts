import { ChromeEventType } from "@/content/getPageDomPath/chomeEventMap";
import { postMessageToTab } from "@/utils/chromeMessage"
import ChromeStorage from "@/background/chromeStorage";
import {ChromeStorageEnum} from '@/background/chromeStorage' 
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
        console.log('全局快捷键 Ctrl+Shift+Y 被触发');
        // 执行相应的操作
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0]
            console.log("我是当前打开的tab页的信息", currentTab)
            postMessageToTab<Trigger, DomPathInfo>(
                currentTab.id as number,
                {
                    type: ChromeEventType.TRIGGER_ACTION,
                    data: {
                        showEle: true
                    }
                },
                async (response) => {
                    console.log("content获取到信息", response)
                    const { type, data } = response;
                    const {domPath} = data;
                    const removeTrim = domPath.replace(/^\s+|\s+$/g, '')
                    if (type == 'success' && removeTrim) {
                        // 将dom的链接信息保存到数据库当中
                        const elementPathInfo = await ChromeStorage.getItem(ChromeStorageEnum.ELEMENT_PATH) || []
                        const data = elementPathInfo.length + pk
                        const hash = CryptoJS.SHA256(data).toString()
                        console.log("我是获取到的hash散列值", hash)
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