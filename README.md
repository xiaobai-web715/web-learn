# sd-learn

## javascript

### 测试用法的 demo

    http_createServer与http_request 模拟服务端以application/json或application/x-www-form-urlencoded格式发送对应格式数据并在客户端获取二进制数据流进行解析

### middleTest 测试 demo

    测试express中间件与路由处理函数的链式调用的规则
      1.当中间件或者满足匹配的路由处理函数执行,但没有调用next的话,会将这个链式调用进行终止.
      2.app.get()匹配路由抛出错误后,虽然没有在代码中显示调用next,但后续的链式仍能执行=》应该是代码的封装当中有调用,并且这个调用应该是使用了next(err)会链式到兜底的500处理
      3.next()的话如果还是执行到了兜底函数则会链式到404

### mongodb 测试 demo

    测试mongodb与node的连接以及简单使用

### xml2js 测试 demo

    测试xml与按规定要求的对象间的相互转换 https://blog.csdn.net/hsany330/article/details/115168342

### concurrencyTest node 并发测试

    install chalk 最新的5版本不支持require的导入 ， 降低版本到4

## React 项目

在未引入 ts 的时候用 prop-types 来进行 props 的属性声明

引入 SCSS 来编写 css 文件

引入 body-parser 来获取 post 请求的参数 (https://blog.csdn.net/weixin_44768794/article/details/120074176?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166055039416782414957382%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=166055039416782414957382&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~pc_rank_34-1-120074176-null-null.142^v40^pc_rank_34_2,185^v2^control&utm_term=express%E7%9A%84post%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E5%88%B0params&spm=1018.2226.3001.4187)
bodyParser.urlencoded()解析 content-type: application/x-www-form-urlencoded 格式请求所携带的参数
bodyParser.json()解析 content-type: application/json 格式请求携带的参数
引入 multer 来处理 content-type 是 multipart/form-data 的参数体

ts 引入

```bash
npm install ts-loader 用来在webpack的rules里面配置编译tsx文件
npm install typescript 会按照tsconfig,json里面的配置来进行ts校验
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react --dev 会按照.eslintrc.js文件里面的配置来进行ts校验
  会遇到的问题:如果package.json文件里面是type: 'module'的话这里要用.eslintrc.cjs文件(因为我是自己搭的所有package.json里面忘记加这一项了)
  如何cltr+s自动根据校验规则格式化不标准格式代码(
    vscode的settings文件里面加入如下：
      "editor.formatOnSave": true,
      "eslint.validate": ["javascript", "javascriptreact", "html", "vue"],
      "editor.codeActionsOnSave": {
        "source.fixAll": true
      }
  )
npm install prettier eslint-config-prettier eslint-plugin-prettier --dev 创建.prettierrc.js文件（点击保存的时候会自动按照配置规则格式化代码）
创建完成.prettierrc.js文件之后需去eslintrc.js文件当中添加两行
    //这一行不用加好像是prettier高版本有兼容了    'prettier/@typescript-eslint',  // 使用 ESLint -config-prettier 禁用来自@typescript-eslint/ ESLint 与 prettier 冲突的 ESLint 规则
    'plugin:prettier/recommended',
    //没有设置成功保存的时候自动格式化代码,所以把上面这一行也注释掉了(不开启prettier)

可能遇到的问题：
  1.找不到index.js文件(原因:因为index.js变成了jsx文件，但是不能直接导入index.tsx => 去webapck的配置里面的resolve选项里面添加一个属性,extensions: [".js", ".json", ".ts", ".tsx"]告诉导入的文件按照这几个后缀来寻找)
  2.报typescript构建失败啥的,可能typescript版本问题可以降低版本(本项目中将typescript@4.5.2)
  3.报ts-loader找不到什么方法的错误啥的应该是与webpack的版本不兼容，降低版本(本项目"ts-loader": "~8.2.0"与"webpack": "^4.46.0") 把install的eslint-loader卸载掉 => 这是我更新ts-loader包的错误好像是与eslint-loader有关
  4.TypeScript emitted no output for ... => 将tsconfig.json的"noEmit": false  这样build的时候就不会报错
  5.如果你是使用webpack的css模块化这样的import Css from './index.scss';也会报一个错误 => 这个错误是因为像这样的文件是没有导出的,可以在src文件下面加一个typings.d.ts配置来解决。但是目前看来是这个文件必须打开,要不还是有ts的警告提示，但不影响后续过程。
  6.如果发现eslint没有生效,打开eslintrc.js文件,在vscode右下角有一个地方会显示其打印日志(然后搜一下解决即可)


  从单页面入口修改为多页面入口(csdn上的总结地址) => https://blog.csdn.net/beilingxiaogu/article/details/127972892?csdn_share_tail=%7B%22type%22%3A%22blog%22%2C%22rType%22%3A%22article%22%2C%22rId%22%3A%22127972892%22%2C%22source%22%3A%22beilingxiaogu%22%7D
  目前在开发环境下对不同模块的路由通过webpack的配置实现了不同入口
```

### 细节问题

    1.React当中引入本地图片: 需借助require('./image/1.jpg').default方式读取 => require()只能接受字符串,不能直接接受变量,但有一个委婉的方式 let url = '3.jpg'; let image = require('./image/' + url); 只能这样来实现。

### 使用思考

    form表单提交默认是get并且会跳转页面,可以通过method属性来指定post请求, target='iframe的名字'以及创建一个name='iframe的名字'的iframe标签来达到不让form表单提交跳转页面的能力
    form表单默认的请求头content-type是application/x-www-form-urlencoded, 可以通过enctype属性指定content-type (当指定multipart/form-data并通过multer中间件可以获取文件信息,在req.files属性里面)

## node 项目

npm install express-handlebars 编写服务端渲染模板(通过 engine 与 set 来配置 Handlebars 视图) res.render('xxx')返回 views 下的 xxx.handlebars 文件

npm install jest 安装 jest 进行 qa 测试 在 package.json 里面添加"test" : 'jest' 然后运行 npm test -- --watch 即可(测试的文件需要写成.test.js 作为后缀或者写在**tests**文件下面, 感觉写成.test.js 文件在项目根目录项运行 npm test 就可以进行测试)

npm install --save-dev eslint 然后再项目根目录运行./node_modules/.bin/eslint --init 配置后会生成.eslintrc.js 文件 ,然后再 package.json 里面的 script 键入"lint": "eslint express.js utils"告诉要对哪些文件或目录进行 lint
除了能在.eslintrc.js 文件当中的 rules 设置当前项目的全局规则,还能在某一条语句上下添加规则(形成局不禁用规则),而不影响到整个项目.(例如 node 初体验\utils\integration-tests\basic-navigation.test.js)第一行与第三的写法

在.eslint.js 的 parserOptions 里添加 project: ['tsconfig.json'], tsconfigRootDir: \_\_dirname 这两行可以使用命令行的方式来校验规则 => 但是这样好像回合 parser 添加的产生冲突(不过这样会解决另一个报错 Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.The file does not match your project config: route\vueVite.ts.The file must be included in at least one of the projects provided.) <= 这个报错还有一个可能是你的 ts 文件包含的文件夹被 tsconfig.json 当中的 exclude 所排除掉了

commonjs 没有模块化概念 => 会导致一个问题就是引入的文件在解构赋值的时候如果是相同的名字,ts 会报错不允许重复声明同一个 const 变量 => 目前的解决思路(安装@babel/plugin-transform-modules-commonjs),添加 babel.config.js 文件并编写配置, tsconfig.json 文件中 esModuleInterop 属性设置为 true , 然后 ts 文件的导出下面都添加一个 export {}来进行欺骗 ts 的操作,并用@babel/plugin-transform-modules-commonjs 将 export {}进行忽略掉

npm install cookie-parser 中间件来使劲儿在设置与访问 token

npm install express-session 中间件用来实现内存存储(要在链入 cookie 中间件之后)

npm install cross-env 网上搜索资料是用来在 package.json 文件当中用来替代 windows 环境下的 set NODE_ENV=production 的这个 set 的,但是网上的资料是结合 webpack 来使得,不知道为啥在起 node 项目的时候 cross-nev 好像并没有让 app.get('dev')的值变成 production =>package.json 里面的写法(set NODE_ENV=production&&ts-node-dev ./express.ts)

npm install morgan 引入日志中间件 会记录对于当前 express 执行当中的日志

npm install winston 引入日志中间件 记录接口请求的参数与返回信息的日志文件

npm install pm2 进程管理器 => 用来对前端的项目进程进行控制

日志相关的是另一个部分 => 可以设置日志只在开发环境进行 console,生产环境打印 log 文件当中

## vue-vite 项目

前置路由守卫实现动态路由,结合 el-ui 生成动态侧边栏菜单

### 细节问题

vue3 对应的 el-ui 的引入方式变成了 el-plus,对应的 ui 组件的引入与写法不同
脚手架搭建的项目,并未配置 scss 相关可以在<style lang='scss'></style>下以@import '你的 scss 文件的路径'来局部加载 scss 公共文件

路由嵌套子路由 => 因为只是通过嵌套来实现分层级,父级路由并没有需要显示的内容,但仍然需要给与一个 component 以及文件来内嵌一个<router-view/>来使用

动态加载路由的时候,需要使用 let modules = import.meta.glob('../\*_/_.vue');优先获取动态路由对应的页面,然后再给 component 赋值 modules[`../view${route.filePath}.vue`]对应的文件
