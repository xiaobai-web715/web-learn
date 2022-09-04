const express = require('express');
const history = require('connect-history-api-fallback')
const {sub} = require('date-fns');
const bodyParser = require('body-parser');
const app = express()
const fs = require('fs');
const path = require('path');
const todoList = require('./route/todoList');
const post = require('./route/posts');
const hoc = require('./route/HOC');
const UploadFile = require('./route/uploadFile');
const touchByMiatask = require('./route/touchByMiatask');

//为什么要使用json()或urlencoded()这两个方式来获取请求参数呢
  //get请求默认的请求头content-type:'默认是application/x-www-form-urlencoded -> 请求体中的数据以表单键值对的形式发送给后端'
  //post请求默认的请求头content-type: '默认是application/json -> 请求体中的数据以json字符串形式发送给后盾'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); //express引入中间件(body-parser用来拦截请求,urlencoded方法会判断请求中是否有请求参数,如果包含就会将请求参数转换成对象类型,再给req请求对象添加body属性)
app.use(bodyParser.text({extended: false}));

app.use('/static', express.static('public')); //express提供的方式来请求静态资源

/*
    注册路由模块
*/
app.use('/todo', todoList); //请求/api/todo的请求会到这个模块当中去请求资源
app.use('/fakeApi', post); 
app.use(hoc);
app.use(UploadFile);
app.use(touchByMiatask);
// app.listen 仅仅使用http模块(如果要使用https则使用https.createServer)
const server = app.listen(3001, () => {
    console.log('Sever onReady');
})

app.get('/', (req, res) => {
    res.send(JSON.stringify({firstName: 'liu', lastName: 'xinghua'}));
    console.log('当前进程的PID', process.pid); //目前不清楚在别的应用程序中这个进程的PID如何获取
    // process.kill(process.pid , 'SIGTERM');
})
//nodejs想要退出程序 => 最直接的写法就是process.exit() => 但这对于http服务器来说这样会终止一切正在等待的请求
                 //  => 所以可以通过发出信号的方式去执行 SIGTEMR 
                 //  => 这个就相当于发布订阅模式(在此处发布,其余地方订阅后这里去执行)
process.on('SIGTEMR', () => {
    server.close(() => {
        console.log('响应成功,退出nodejs程序');
    })
})
app.use(history());