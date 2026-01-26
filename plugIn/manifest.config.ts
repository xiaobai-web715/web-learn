import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  omnibox: { "keyword": "aaron" },
  icons: {
    16: 'images/icon-16.png',
    32: 'images/icon-32.png',
    48: 'images/icon-48.png',
    128: 'images/icon-128.png',
  },
  action: {
    default_icon: {
      48: 'images/icon-48.png',
    },
    default_popup: 'src/popup/index.html',
  },
  content_scripts: [{
    js: ['src/content/main.ts'], // 需要注入的css文件可以通过js引入，编译后的清单会自动注入对应的css资源文件
    matches: ['https://*/*'],
    run_at: 'document_start'
  }],
  permissions: [
    'sidePanel', // 侧边栏权限
    'contentSettings',
    'webNavigation',
    'scripting', // 脚本注入权限
    'activeTab',
    'omnibox',
    'alarms', // 安排代码在指定时间或未来某个时间定期运行的权限
    'storage', // 满足扩展程序的存储需求权限
    'commands', // 键盘快捷键触发监听权限
  ],
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module'
  },
  side_panel: {
    default_path: 'src/sidepanel/index.html',
  },
  commands: {
    "run-foo": {
      "suggested_key": {
        default: "Ctrl+Shift+Y",
        mac: "Command+Shift+Y"
      },
      description: "Run \"foo\" on the current page."
    },
    "_execute_action": {
      "suggested_key": {
        windows: "Ctrl+Shift+Y",
        mac: "Command+Shift+Y",
        chromeos: "Ctrl+Shift+U",
        linux: "Ctrl+Shift+J"
      }
    }
  },
  "host_permissions": [
    "*://*/*"
  ]
})

