const cluster = require('cluster')
const pm2 = require('pm2');
const { promisify } = require('util');

process.on('message', (raw) => {
  console.log('我是pm2接收的消息:', JSON.stringify(raw));
});

new Promise( async (resolve, reject) => {
    const connect = promisify(pm2.connect.bind(pm2));
    const launchBus = promisify(pm2.launchBus.bind(pm2));
    await connect();
    const bus = await launchBus();
    bus.on('process:msg', (packet) => {
        const { raw, process: { pm_id: processId } } = packet;
        // console.log('pm2的busApi获取的信息:', JSON.stringify(raw), processId)
        pm2.sendDataToProcessId(processId, raw, () => {});
    });
    process.send({ topic: 'test', data: 'Hello, Billion Bottle!' });
    resolve();
}).then(() => {
    if (cluster.isMaster) {
        cluster.fork(); //并创建对应的子进程
        // const worker = cluster.fork();
        process.send('Hello, Son!') //主进程向子进程发送消息
        // worker.on('message', (message) => { // 主进程接收子进程的消息
        //     console.log('我是主进程接收的消息' + message)
        // })
        // process.on('message', (message) => { // 主进程接收子进程的消息
        //     console.log('我是主进程接收的消息:' + JSON.stringify(message))
        // })
    } else {
    
        // process.on('message', (message) => { //子进程接收主进程发送的消息
        //     console.log('我是子进程接收的消息' + message)
        // })
        process.send('Hello, Father。') //子进程向主进程发发送消息
    }
})
// if (cluster.isMaster) {
//     cluster.fork();
//     process.send('Hello, Son!') //主进程向子进程发送消息
//     // worker.on('message', (message) => { // 主进程接收子进程的消息
//     //     console.log(message)
//     // })
// } else {
//     // process.on('message', (message) => { //子进程结束主进程发送的消息
//     //     console.log(message)
//     // })
//     process.send('Hello, Father。') //子进程向主进程发发送消息
// }
