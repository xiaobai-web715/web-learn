const obj = Object.create(new Proxy({}, {
    set (obj, k, v, receiver) {
        // const k = Symbol(11); k = Symbol(11)
        // `${k}` => TypeError: Cannot convert a Symbol value to a string
        // String(k) => 'Symbol(12)'=> 总结下来就是符号在转字符串的时候不能使用 `${}`的形式


        // return Reflect.set(obj, k, v);
        // 从浏览器的打印结果可以看到新增的prop属性并没有如愿加在obj对象上,而是加在了obj的原型对象上
        // obj的原型对象就是Proxy的实例, 而且打印obj也是Proxy的实例对象 (这里还想不出详细操作, 但应该是给obj赋值的时候在寻找代理器并调用的过程中导致obj这个目标对象发生了变化)
        return Reflect.set(obj, k, v, receiver);
        // 不过代理器函数可以接受receiver这个参数代表代理对象 => 应该就是正确的this指向
    }
}))
obj.prop = 'this';
console.log(obj);



// 将Proxy 作为原型对象的时候如果代理器函数当中有get(target, key, receiver) {console.log(target, key, receiver)}像这样去打印的就会超出执行栈
const obj1 = Object.create(new Proxy({name: 'lxh'}, {
    get (target, key, receiver) {
        console.log(target, key, receiver);
    }
}))
console.log(obj1);
export {}