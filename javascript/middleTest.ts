import { nextTick } from "process";

const express = require('express')
const app = express();

app.use((res, req, next) => {
    console.log('我是第一个中间件');
    next();
})
app.get('/a', (req, res, next) => {
    console.log('/a路由匹配');
    // next();
    res.send('成功匹配到/a的路由')       
    /**
     * 匹配/a路由的链式流程到这里结束,因为这里并没有在调用next函数
     */
})
app.get('/a', (req, res, next) => {
    console.log('/a并不会在匹配到了,因为前面匹配到的路由里面并没有调用next')
    // next();
})
app.get('/b', (req, res, next) => {
    console.log('/b路由匹配');
    next();
})
app.use((req, res, next) => {
    console.log('前面出现了未调用next的中间件或者路由函数匹配到但里面也没有调用next,就不会执行到这里');
    next();
})
app.get('/b', (req, res, next) => {
    console.log('/b路由继续匹配,因为前面那个匹配/b的路由有继续调用next');
    throw new Error('b failed');
})
app.use('/b', (err, req, res, next) => {
    console.log('/b路由匹配不到这里因为前一个匹配的路由处理函数没有使用next进行链式调用', err);
    next(err);  //目前感觉是这里next了一个err值进去后,就会匹配兜底路由500
})
app.get('/c', (req, res) => {
    console.log('/c路由匹配的处理函数');
    throw new Error('c failed');
})
app.use('/c', (err, req, res, next) => {
    console.log('/c路由匹配发生了错误');
    next(); //这里只next,就会调用兜底的404
})
/**
 * 兜底处理函数
 */
app.use((err, req, res, next) => {
    console.log('500路由没有处理');
    res.send('500-server error');
})
app.use((req, res, next) => {
    console.log('404路由没有处理');
    res.send('404-not found');
})
app.listen(3002, () => {
    console.log('Express started on http://localhost:3002; press Ctrl-C to terminate')
})