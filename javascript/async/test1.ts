const test = (): any => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('我是在之后执行的');
            resolve(11);
        }, 3000);
    }).then(res => '截胡');
}

const main = async (): Promise<any> => {
    const target: any = await test(); //await可以对实现thenable的接口的对象进行解包
    console.log('target', target);
}
main();
export {}