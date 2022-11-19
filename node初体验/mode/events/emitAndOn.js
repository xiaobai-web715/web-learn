const { EventEmitter } = require('node:events')

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter()
myEmitter.on('event', function (a, b) {
    console.log('发布的事件被触发', a, b, this, this === myEmitter)
    // 这个回调函数与dom触发监听事件的回调函数一样,在当前函数回调的时候this的指向被修改了
})
myEmitter.emit('event', '99', '08')

myEmitter.on('error', (err) => {
    console.log('whoops! there was an error')
})
myEmitter.emit('error', new Error('whoops!'))
