const pm2 = require('pm2');
const { promisify } = require('util');

process.on('message', (raw) => {
  console.log('Cluster message received from worker:', JSON.stringify(raw));
});

(async () => {
  const connect = promisify(pm2.connect.bind(pm2));
  const launchBus = promisify(pm2.launchBus.bind(pm2));

  await connect();
  const bus = await launchBus();

  bus.on('process:msg', (packet) => {
    const { raw, process: { pm_id: processId } } = packet;
    pm2.sendDataToProcessId(processId, raw, () => {});
  });
  process.send({ topic: 'test', data: 'Hello, Billion Bottle!' });
})();