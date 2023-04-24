module.exports = {

    types: [
      {
        value: ':construction: WIP',
        name: '💪  WIP:      Work in progress'
      },
      {
        value: ':sparkles: feat',
        name: '✨  feat:     新功能'
      },
      {
        value: ':bug: fix',
        name: '🐛  fix:      修复'
      },
      {
        value: ':hammer: refactor',
        name: '🔨  refactor:     重构 (既不增加feature, 也不是修复bug)'
      },
      {
        value: ':pencil: docs',
        name: '📝  docs:     文档变更'
      },
      {
        value: ':white_check_mark: test',
        name: '✅  test:     增加测试'
      },
      {
        value: ':thought_balloon: chore',
        name: '🗯  chore:     构建过程或辅助工具的变动'
      },
      {
        value: ':lipstick: ui',
        name: '💄 style:     代码格式(不影响代码运行的变动)',
      },
      {
        value: ':art: style',
        name:
          '🎨 Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
      },
      {
        value: ':rewind: revert',
        name: '⏪  revert:   回退'
      },
      {
        value: ':package: dep_up',
        name: '📦 Updating compiled files or packages.',
      },
      {
        value: ':green_heart: fixci',
        name: '💚 build:     打包',
      },
      {
        value: ':truck: mv',
        name: '🚚 Moving or renaming files.',
      },
      {
        value: ':fire: prune',
        name: '🔥 Removing code or files.',
      },
      {
        value: ':bookmark: release',
        name: '🔖 Releasing / Version tags.',
      },
      {
        value: ':rocket: first release',
        name: '🚀 first releast!',
      }
    ],
    // 步骤
    messages: {
        type: '请选择提交的类型：',
        customScope: '情输入修改的范围(可选)',
        subject: '请简要描述提交(必填)',
        body: '请输入详细描述(可选)',
        footer: '请输入要关闭的issus(可选)',
        confirmCommit: '确认要使用以上信息提交？(y/n)'
    },

    // 默认长度72
    subjectLimit: 72,
  
    scopes: [],
  
    allowCustomScopes: true,
    allowBreakingChanges: ["feat", "fix"]
  };