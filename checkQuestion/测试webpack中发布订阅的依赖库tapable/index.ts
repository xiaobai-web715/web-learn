import { SyncHook, AsyncParallelHook } from 'tapable';
class Car {
    hooks;
    constructor() {
        this.hooks = {
            accelerate: new SyncHook<string, void>(['newSpeed']),
            brake: new SyncHook<string, void>(['b']),
            calculateRoutes: new AsyncParallelHook<string[], void>(['source', 'target', 'routesList']),
        };
    }
}

const myCar = new Car();

console.log('myCar.hooks.accelerate', myCar.hooks.accelerate);

myCar.hooks.brake.tap('WarningLampPlugin', (a) => console.log('WarningLampPlugin', a));

myCar.hooks.brake.call('哈哈哈');

myCar.hooks.accelerate.tap('LoggerPlugin', (newSpeed) => console.log(`Accelerating to ${newSpeed}`));

myCar.hooks.accelerate.call('刘兴华');
