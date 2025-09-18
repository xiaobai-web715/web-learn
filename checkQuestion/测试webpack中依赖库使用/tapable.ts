import { SyncHook, AsyncParallelHook, HookMap, SyncWaterfallHook, UnsetAdditionalOptions, AsyncSeriesHook } from 'tapable';
class Car {
    hooks;
    constructor() {
        this.hooks = {
            accelerate: new SyncHook<[string, boolean], void>(['newSpeed', 'throwError']), // 这里newSpeed相当于入参占位符号
            brake: new SyncHook<string, void>(),
            calculateRoutes: new AsyncParallelHook<[string, string, string[]], void>(['source', 'target', 'routesList']),
            keyed: new HookMap(() => {
                return new SyncHook(['arg']);
            }), // 返回一个Map,Map的key是以for传递的字符串作为key的
            resolveOptions: new HookMap(() => {
                return new SyncWaterfallHook(['resolveOptions']);
            }),
            norelease: new AsyncSeriesHook<any>(['item'])
        };
    }
}

const myCar = new Car();
/**
 * ---start---
 * SyncHook用法
 * 定义时存在入参占位符，下面的call传入的入参才会在tap的回调函数中打印出来
 * callAsync相比于call的掉，能够将操作错误捕获并回传到callAsync传入的回调函数当中
 * callAsync的回调函数只能接收Error的入参，Result后的值不会触发回调
 */
myCar.hooks.accelerate.tap('LoggerPlugin', (newSpeed, throwError) => {
    console.log(`Accelerating to ${newSpeed}`)
    if (throwError) {
        throw new Error('LoggerPlugin')
    } else {
        return 'LoggerPlugin'
    }
});
myCar.hooks.accelerate.tap('LoggerPlugin2', (newSpeed, throwError) => {
    console.log(`Accelerating to ${newSpeed} two`)
    if (throwError) {
        throw new Error('LoggerPlugin2')
    } else {
        return 'LoggerPlugin2'
    }
});
myCar.hooks.accelerate.call('哈哈哈有占位符', false); // accelerate下发布的事件都会执行
myCar.hooks.accelerate.callAsync('测试回调', true, (err) => {
    console.log('回调函数执行了-accelerate', err);
})

myCar.hooks.brake.tap('WarningLampPlugin', (a) => console.log('WarningLampPlugin', a));
myCar.hooks.brake.call('哈哈哈无占位符');
/**
 * ---end---
 */

/**
 * ---start---
 * AsyncParallelHook用法
 * AsyncParallelHook的回调函数只能接收Error的入参，Result后的值不会触发回调
 * tapAsync可以主动触发这个回调函数
 */
myCar.hooks.calculateRoutes.tap('CalculateRoutes', (source, target, routesList) => {
    console.log(`CalculateRoutes from ${source} to ${target}`);
    throw new Error('CalculateRoutes !!!');
})
myCar.hooks.calculateRoutes.tapAsync('AsyncCalculateRoutes', (source, target, routesList, callback) => {
    console.log(`AsyncCalculateRoutes from ${source} to ${target}`);
    callback()
})

myCar.hooks.calculateRoutes.callAsync('S', 'T', ['R'], (err) => {
    console.log('回调函数执行了-calculateRoutes', err);
})
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
myCar.hooks.resolveOptions.for('resolveOptions').tap('MyResolveOptions2', (arg) => {
    console.log(`MyResolveOptions-${arg}`);
    return 'resolveOptions return value2';
});

const resolveHook = myCar.hooks.resolveOptions.get('resolveOptions')
if (resolveHook) {
    const result = resolveHook.callAsync('test', (err) => {
        console.log('抛出异常', err);
    });
    console.log(`SyncWaterfallHook返回值-${result}`);
}

/**
 *
 */

/**
 * --- start ---
 * norelease 测试不发布事件只订阅事件，看看可不可以触发订阅的回调
 */

myCar.hooks.norelease.callAsync('123', () => {
    console.log('回调函数执行了-norelease')
})