const qs = require('querystring');
const http = require('http');
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' }); //以application/json格式向客户端发送JSON类型的数据
    res.end(JSON.stringify({
        data: '你好,世界!'
    }));
}).listen(8000);

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/x-www-form-urlencoded' }); //以application/x-www-form-urlencoded格式向客服端发送键值对格式的数据
    let content = {
        data: '你好,世界!',
        name: '卷心菜'
    }
    let array = Object.entries(content).map(([key , value]) => {
        return `${key}=${value}`
    })
    res.end(array.join('&'));
}).listen(8001);