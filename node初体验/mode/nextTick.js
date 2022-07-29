// 测试滴答的执行顺序
console.log('我是第一次事件循环');
setTimeout(() => {
    console.log('我是第一次的还是第二次的');
    new Promise((resolve , reject) => {
        resolve(3)
    }).then((res) => {
        console.log('我是第二次事件循环')
        return null
    })
}, 100)
process.nextTick(() => {
    console.log('我是一次滴答的终点');
})