const express = require('express')
const bodyParser = require('body-parser')
// const expressHandlebars = require('express-handlebars'); //引入服务端html模板框架 => 这样的引入有错误expressHandlebars is not founction
const { engine } = require('express-handlebars')
// const history = require('connect-history-api-fallback')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
// node实现多进程
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

const { credentials } = require('./config/config.js')

const app = express()
const todoList = require('./route/todoList')
const post = require('./route/posts')
const hoc = require('./route/HOC')
const UploadFile = require('./route/uploadFile')
const touchByMiatask = require('./route/touchByMiatask')
const upFile = require('./route/upFile')
const vueVite = require('./route/vueVite.ts')
const syt = require('./route/syt')
const sytUser = require('./route/sytUser')

const { getParams } = require('./utils/request/paramUtil')

const severRendering = require('./utils/handlers') // 服务端渲染路由

switch (app.get('env')) {
    case 'development':
        app.use(morgan('dev'))
        break
    case 'production':
        const stream = fs.createWriteStream(path.join(__dirname, './', 'access.log'), { flags: 'a' })
        app.use(morgan('combined', { stream }))
        break
}

// 配置Handlebars视图引擎
app.engine('handlebars', engine({
    defaultLayout: 'main'
}))
// app.engine('handlebars', expressHandlebars({
//     defaultLayout: 'main'
// }));
app.set('view engine', 'handlebars')

// express引入中间件(body-parser用来拦截请求,解析req.body属性,再将原有的body属性进行覆盖)
app.use(bodyParser.urlencoded({ extended: true })) // 解析 content-type: application/x-www-form-urlencoded格式请求所携带的参数
app.use(bodyParser.json()) // 解析content-type: application/json格式请求携带的参数
// app.use(bodyParser.text({extended: false}));

/**
 * 引入设置cookie的中间件
 */
app.use(cookieParser(credentials.cookieSerect))
/**
 * 链入session中间件
 */
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSerect
}))
/*
    请求返回静态资源的方式
*/
app.use('/static', express.static('public')) // express提供的方式来请求静态资源

/*
    注册路由模块
*/
app.use('/todo', todoList) // 请求/api/todo的请求会到这个模块当中去请求资源
app.use('/fakeApi', post)
app.use(hoc)
app.use(UploadFile)
app.use(touchByMiatask)
app.use('/upFile', upFile)
app.use('/vueVite', vueVite)
app.use('/syt', syt)
app.use('/sytUser', sytUser)
// app.listen 仅仅使用http模块(如果要使用https则使用https.createServer)
let server = null
const port = process.env.PORT || 3001

// 对于node来说，当require.main === module的时候说明是node直接运行的该文件
// 不等的时候说明该文件是导入的
console.log('cluster.isMaster', cluster.isMaster)
if (require.main === module) {
    if (cluster.isMaster) {
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }
        cluster.on('online', function (worker) {
            console.log('Worker ' + `${worker.process.pid}` + ' is online')
        })
        cluster.on('exit', function (worker, code, signal) {
            console.log('Worker ' + `${worker.process.pid}` + ' died with code: ' + `${code}` + ', and signal: ' + `${signal}`)
            console.log('Starting a new worker')
            cluster.fork() // 这里监听到子进程有退出的情况这里就会重启一个， 然后就会被online事件监听到
        })
    } else {
        server = app.listen(3001, () => {
            console.log(`Express ${process.pid} started in ${app.get('env')} on http://localhost:${port}; press Ctrl-C to terminate`)
        })
    }
    // server = app.listen(3001, () => {
    //     console.log(`Express ${process.pid} started in ${app.get('env')} on http://localhost:${port}; press Ctrl-C to terminate`)
    // })
} else {
    module.exports = app
}

app.get('/', (req, res) => {
    const params = getParams(req)
    console.log('params', params)
    res.send(JSON.stringify({ firstName: 'liu', lastName: 'xinghua' }))
    console.log('当前进程的PID', process.pid) // 目前不清楚在别的应用程序中这个进程的PID如何获取
    // process.kill(process.pid , 'SIGTERM');
})

/*
    服务端渲染
*/
app.use('/home', severRendering.home)
app.use('/about', severRendering.about)
app.get('/headers', (req, res) => {
    console.log('浏览器请求还是ajax请求', req.xhr) // req.xhr ajax调用返回true
    res.type('text/plain')
    const headers = Object.entries(req.headers).map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
})
/*
    app.use加载路由无法找到的404与500中间件(服务端渲染)
*/
app.use(severRendering.notFoundPage)
app.use(severRendering.severError)

// nodejs想要退出程序 => 最直接的写法就是process.exit() => 但这对于http服务器来说这样会终止一切正在等待的请求
//  => 所以可以通过发出信号的方式去执行 SIGTEMR
//  => 这个就相当于发布订阅模式(在此处发布,其余地方订阅后这里去执行)
process.on('SIGTEMR', () => {
    console.log(`pid: ${process.pid}收到消息`)
    server.close(() => {
        console.log('响应成功,退出nodejs程序')
    })
})
// app.use(history());
