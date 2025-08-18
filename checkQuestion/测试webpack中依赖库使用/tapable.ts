import { SyncHook, AsyncParallelHook, HookMap, SyncWaterfallHook, UnsetAdditionalOptions } from 'tapable';
class Car {
    hooks;
    constructor() {
        this.hooks = {
            accelerate: new SyncHook<string, void>(['newSpeed']), // 这里newSpeed相当于入参占位符号
            brake: new SyncHook<string, void>(),
            calculateRoutes: new AsyncParallelHook<string[], void>(['source', 'target', 'routesList']),
            keyed: new HookMap(() => {
                return new SyncHook(['arg']);
            }), // 返回一个Map,Map的key是以for传递的字符串作为key的
            resolveOptions: new HookMap(() => {
                return new SyncWaterfallHook(['resolveOptions']);
            }),
        };
    }
}

const myCar = new Car();
/**
 * ---start---
 * SyncHook用法
 * 定义时存在入参占位符，下面的call传入的入参才会在tap的回调函数中打印出来
 */
myCar.hooks.accelerate.tap('LoggerPlugin', (newSpeed) => console.log(`Accelerating to ${newSpeed}`));
myCar.hooks.accelerate.call('哈哈哈有占位符');
myCar.hooks.brake.tap('WarningLampPlugin', (a) => console.log('WarningLampPlugin', a));
myCar.hooks.brake.call('哈哈哈无占位符');
/**
 * ---end---
 */

/**
 * ---start---
 * HookMap用法 - for中的入参作为Map的key, 值即为SyncHook创建的hook
 */
myCar.hooks.keyed.for('keyed').tap('MyPlugin', (arg) => {
    console.log(`keyed to ${arg}`);
    throw new Error('warning !!!');
});

const someKeyHooks = myCar.hooks.keyed.get('keyed');
if (someKeyHooks) {
    someKeyHooks.callAsync('嘿嘿嘿', (err) => {
        console.log('抛出异常', err);
    });
}
/**
 * ---end---
 */

/**
 * ---start---
 * SyncWaterfallHook 用法, 可以借助回调函数返回值
 */
myCar.hooks.resolveOptions.intercept({
    factory(type, _hook) {
        console.log('我的拦截type', type, _hook);
        const hook = _hook;
        return hook as SyncWaterfallHook<unknown, UnsetAdditionalOptions>;
    },
});
myCar.hooks.resolveOptions.for('resolveOptions').tap('MyResolveOptions', (arg) => {
    console.log(`MyResolveOptions-${arg}`);
    return 'resolveOptions return value';
});

const result = myCar.hooks.resolveOptions.for('resolveOptions').call('test');

console.log(`SyncWaterfallHook返回值-${result}`);
/**
 *
 */
