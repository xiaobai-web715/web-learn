const {EventEmitter} = require('node:events');
const myEmitter = new EventEmitter();
//on => 该发布的事假可以多次触发; once => 该发布的事件仅能触发一次
myEmitter.once('newListener', (event, listener) => {
    //newListener可以监听发布的动作,回调函数接收的第一个参数是发布的事件的名字
    if(event === 'event'){
        myEmitter.on('event', () => {
            //从打印结果来看这个监听器会排在第15行监听器的前面(这说明通过newListener发布的内部再发布的事件,只要是外面有同名的事件,那么当前事件就会在外面的前面)
            console.log('我是在newListener里面的');
        })
    }
    console.log('当发布事件的时候这里会执行', event);
})

myEmitter.on('event', () => {
    console.log('我是在newListener外面的');
});

myEmitter.on('item', () => {
    console.log('发布item事件')
});

myEmitter.emit('event');