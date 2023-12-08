const { XMLHttpRequest: XMLHttpRequestReq } = require('xmlhttprequest');

const xhr: XMLHttpRequest = new XMLHttpRequestReq()

const xhrUrl: string = 'http://localhost:3001/todo/getXHRInfo'

xhr.open('GET', xhrUrl, true) //初始化请求

xhr.send() //发送请求

//监听请求的取消
xhr.addEventListener('abort', function () {
    console.log('请求被取消掉了')
})

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        console.log(xhr.responseText)
    }
}

//定时器模拟取消请求
setTimeout(() => {
    // 取消请求
    xhr.abort();
    //取消请求之后的状态status
    console.log('abort()之后的xhr.status---', xhr.status);
    //取消请求之后的状态readyState
    console.log('abort()之后的xhr.readyState---', xhr.readyState);
}, 100)