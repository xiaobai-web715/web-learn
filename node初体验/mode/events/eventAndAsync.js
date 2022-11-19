const { EventEmitter } = require('node:events')
EventEmitter.captureRejections = true
const ee = new EventEmitter()
ee.on('something', async (value) => {
    throw new Error('kaboom')
})
ee.on('error', console.log)
// 因为在抛出异常的情况下可能导致未处理的拒绝
// myEmitter.emit('something');
// 目前还不清楚官网给出的例子的原因(但是不允许将async 与 发布订阅模式一起用)
