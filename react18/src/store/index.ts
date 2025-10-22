import { makeObservable, observable, action, computed, autorun } from 'mobx';
class Doubler {
    value = 1;
    constructor() {
        // state
        makeObservable(this, {
            value: observable,
            increment: action.bound,
            total: computed({
                equals: (a, b) => { // 被autorun依赖的时候会触发这个的调用
                    console.log("我是两次比较的值", a, b);
                    return a === b;
                }
            })
        });
    }
    // action
    increment() {
        this.value++;
        console.log("====value&total", this.value, this.total);
    }
    // computed
    get total() {
        return this.value * 2;
    }
}

const doubler = new Doubler();
autorun(() => {
    console.log("====total变换", doubler.total);
});
export default doubler;