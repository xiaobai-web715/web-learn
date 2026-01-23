import { call, take } from "redux-saga/effects";
export default function* () {
    // let now = Date.now();
    // console.log("我是进入saga的时间戳", now);
    // const value1 = yield new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve("1s秒后执行");
    //         now = Date.now();
    //     }, 1000);
    // }); 
    // console.log("我是第一个yeild的值", value1, now);
    // const value2 = yield put({ type: "posts/postAdded" });
    // console.log("我是第二个yeild的值", value2);
    // const value3 = yield takeEvery("posts/postAdded", (action) => {
    //     console.log("我监听到action的触发了", action);
    //     return "1234";
    // });
    // console.log("我是第三个yeild的值", value3);
    console.log("我是第一个yeild的值");
    const value3 = yield take("posts/postAdded");
    console.log("我是第三个yeild的值", value3);
    const value4 = yield call((a, b) => {
        console.log("我是传入的值", a, b);
        return a + b;
    }, 1, 2);
    console.log("我是第四个yeild的值", value4);
}

export const myMiddleWare1 = (store) => (next) => (action) => {
    const result = next(action);
    console.log("我是第一个中间件", store, next, result);
    return result;
};

export const myMiddleWare2 = (store) => (next) => (action) => {
    const result = next(action);
    console.log("我是第二个中间件", store, next, result);
    return result;
};