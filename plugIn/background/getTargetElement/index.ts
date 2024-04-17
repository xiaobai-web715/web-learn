import {postMessageToTab} from "@/utils/chromeMessage"
chrome.commands.onCommand.addListener(function(command) {
    if (command === 'trigger-action') {
      console.log('全局快捷键 Ctrl+Shift+Y 被触发');
      // 执行相应的操作
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const currentTab = tabs[0]
        console.log("我是当前打开的tab页的信息", currentTab)
        postMessageToTab(currentTab.id as number, {showEle: true}, (response) => {
            console.log("content获取到信息", response)
        })
      })
    }
});