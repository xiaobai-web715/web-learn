var i;
for (i = 0; i < 5; i++) {
    ((i) => {
        console.log('i', i);
        setTimeout(() => {
            console.log('我是打印的值', i)
        }, 1000)
    })(i)
}


const testFn = async () => {
    for (var j = 0; j < 5; j++) {
        // await setTimeout(() => { //await后面不是promise这样的好像会立即变成完成状态,并不会管后面的逻辑有没有执行完成
        //     console.log('我是await打印的值', j)
        // }, 1000)
        await new Promise(resolve => {
            setTimeout(() => {
                console.log('我是await打印的值', j)
                resolve(null)
            }, 1000)
        })
    }
    await console.log('我是最后才打印的值吗', j)
}
testFn()