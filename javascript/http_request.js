const http = require('http');

const postData = JSON.stringify({
    'msg': 'Hello World!'
});

const options = {
    host: '127.0.0.14',
    port: Math.random() > 0.5 ? 8001 : 8000,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',  //这个请求头只是告诉服务器该以怎样的方式接收参数
      'Content-Length': Buffer.byteLength(postData)
    }
};
let headers = null;
new Promise((resolve, reject) => {
    let buffer = [];
    const req = http.request(options, (res) => {
        // options配置好请求的参数
        headers = res.headers;
        res.on('data', (chunk) => {
            console.log('```````读取的二进制数据流``````````')
            console.log(chunk);
            buffer.push(chunk);
        })
        res.on('end', () => {
            console.log('```````二进制数据流读取结束``````````')
            resolve(Buffer.concat(buffer));
        })
    })
    req.setTimeout(5000 * 2);
    req.on('error', (err)=> {
        console.log('err'. err);
    })
    req.write(postData); //postData是请求的params
    req.end();
}).then(res => {
    if (headers['content-type'] === 'application/json') {
        return JSON.parse(res.toString('utf-8'));
    } else if (headers['content-type'] === 'application/x-www-form-urlencoded') {
        let keyValue = res.toString('utf-8');
        let arrayValue = keyValue.split('&');
        let data = {};
        arrayValue.forEach(item => {
            let keyValue = item.split('=');
            data[keyValue[0]] = keyValue[1];
        })
        return data
    }
}).then(res => {
    console.log('请求回来的数据', res);
})