(async () => {
    // return await new Error('12');
    try {
        throw 12;
    } catch (err) {
        return new Error(err);
    }
    // return await 12;
})().then(res => {
    console.log('res', res);
}).catch(err => console.log('err', err));
//运行上面结果可以看出立即执行函数也是可以有返回值的，返回的值就是你return的东西