# sd-learn

## React项目
  引入SCSS来编写css文件

  引入body-parser来获取post请求的参数 (https://blog.csdn.net/weixin_44768794/article/details/120074176?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166055039416782414957382%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=166055039416782414957382&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~pc_rank_34-1-120074176-null-null.142^v40^pc_rank_34_2,185^v2^control&utm_term=express%E7%9A%84post%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E5%88%B0params&spm=1018.2226.3001.4187)
  引入multer来处理content-type是multipart/form-data的参数体

  ts引入
  ```bash
  npm install ts-loader 用来在webpack的rules里面配置编译tsx文件
  npm install typescript 会按照tsconfig,json里面的配置来进行ts校验
  npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react --dev 会按照eslintrc.js文件里面的配置来进行ts校验
  npm install prettier eslint-config-prettier eslint-plugin-prettier --dev 创建.prettierrc.js文件（点击保存的时候会自动按照配置规则格式化代码）
  创建完成.prettierrc.js文件之后需去eslintrc.js文件当中添加两行
      'prettier/@typescript-eslint',  // 使用 ESLint -config-prettier 禁用来自@typescript-eslint/ ESLint 与 prettier 冲突的 ESLint 规则
      'plugin:prettier/recommended',  
  

  可能遇到的问题：
    1.找不到index.js文件(原因:因为index.js变成了jsx文件，但是不能直接导入index.tsx => 去webapck的配置里面的resolve选项里面添加一个属性,extensions: [".js", ".json", ".ts", ".tsx"]告诉导入的文件按照这几个后缀来寻找)
    2.报typescript构建失败啥的,可能typescript版本问题可以降低版本(本项目中将typescript@4.5.2)
    3.报ts-loader找不到什么方法的错误啥的应该是与webpack的版本不兼容，降低版本(本项目"ts-loader": "~8.2.0"与"webpack": "^4.46.0") 把install的eslint-loader卸载掉 => 这是我更新ts-loader包的错误好像是与eslint-loader有关
    4.TypeScript emitted no output for ... => 将tsconfig.json的"noEmit": false  这样build的时候就不会报错
    5.如果你是使用webpack的css模块化这样的import Css from './index.scss';也会报一个错误 => 这个错误是因为像这样的文件是没有导出的,可以在src文件下面加一个typings.d.ts配置来解决。但是目前看来是这个文件必须打开,要不还是有ts的警告提示，但不影响后续过程。
  ```
  ### 细节问题
    1.React当中引入本地图片: 需借助require('./image/1.jpg').default方式读取 => require()只能接受字符串,不能直接接受变量,但有一个委婉的方式 let url = '3.jpg'; let image = require('./image/' + url); 只能这样来实现。
  
