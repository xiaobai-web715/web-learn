const connect = require('connect');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const app = connect();

// 使用middleware代理资源文件

app.use('/src', function (req, res, next) {
    const filePath = path.join(__dirname, '/web/src', req.url);
    const contentType = mime.lookup(filePath) || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': `${contentType};charset=utf-8` });
    res.end(fs.readFileSync(filePath));
});

app.use(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end(fs.readFileSync(path.resolve(__dirname, './web', 'index.html')));
});

app.listen(5000, () => {
    console.log('server is listening at http://localhost:5000');
});
