const cluster = require('cluster')
const pm2 = require('pm2');
const { promisify } = require('util');
console.log('cluster.isMaster', cluster.isMaster)
if (cluster.isMaster) {
    console.log('我是主进程' + `${process.pid}`)
    process.on('message', (raw) => {
        console.log('Cluster message received from worker:', JSON.stringify(raw));
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
        cluster.fork();
    })
} else {
    process.send('Hello, Father。My name is ' + `${process.pid}`) //子进程向主进程发发送消息
}