const plugin = {
    "manifest_version": 3,
    "name": "Hello Extensions",
    "description": "Base Level Extension",
    "version": "1.0",
    "action": {
      "default_popup": "hello.html",
      "default_icon": "hello_extensions.png"
    },
    "background": {
      "service_worker": "background.js" // 在后台监控浏览器事件
    },
    "content_scripts": [
      {
        "js": ["scripts/content.js"], // 多个JS按顺序注入
        "matches": [
          "https://developer.chrome.com/docs/extensions/*",
          "https://developer.chrome.com/docs/webstore/*"
        ],
        "run_at": "document_start" // 代码注入的时间，可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
      }
    ],
    "permissions":
    [
      "contextMenus", // 右键菜单 
      "tabs", // 标签
      "notifications", // 通知
      "webRequest", // web请求
      "webRequestBlocking",
      "storage", // 插件本地存储
      "scripting", //使用scripting api插入或移除样式表
    ],
    "commands": { // 启用关闭快捷键
      "_execute_action": {
        "suggested_key": {
          "default": "Ctrl+B",
          "mac": "Command+B"
        }
      }
    }
}