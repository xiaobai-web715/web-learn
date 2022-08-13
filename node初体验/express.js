const express = require('express');
const history = require('connect-history-api-fallback')
const {sub} = require('date-fns');
const app = express()

// app.listen 仅仅使用http模块(如果要使用https则使用https.createServer)
const server = app.listen(3001, () => {
    console.log('Sever onReady');
})

app.get('/', (req, res) => {
    res.send(JSON.stringify({firstName: 'liu', lastName: 'xinghua'}));
    console.log('当前进程的PID', process.pid); //目前不清楚在别的应用程序中这个进程的PID如何获取
    // process.kill(process.pid , 'SIGTERM');
})
app.get('/todoList', (req, res) => {
    res.send(JSON.stringify({
        list: [
            {taskId: 1, value: '吃饭'},
            {taskId: 2, value: '睡觉'},
            {taskId: 3, value: '打豆豆'},
        ]
    }))
})
//因为mock失败,所以在这里建立响应为了模拟redux的createAsyncThunk.
app.get('/fakeApi/posts', (req, res) => {
    res.send(JSON.stringify({
        list: [
            { id: '1', title: 'First Post!', content: 'Hello!' , date: sub(new Date(), {minutes: 10}).toISOString(), reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0
            }},
            { id: '2', title: 'Second Post', content: 'More text', date: sub(new Date(), {minutes: 5}).toISOString(), reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0
            }},
            { id: '3', title: 'Three Post!', content: 'Javascript!' , date: sub(new Date(), {minutes: 3}).toISOString(), reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0
            }},
            { id: '4', title: 'Four Post', content: 'Node', date: sub(new Date(), {minutes: 20}).toISOString(), reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0
            }}
        ]
    }))
})

//hoc高阶组件获取data数据模拟
app.get('/hoc', (req, res) => {
    res.send(JSON.stringify(['react', 'redux', 'node', 'react-router', 'vue', 'vuex', 'vue-router']));
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