const express = require('express');
const router = express.Router();

//get请求获取csv文件
router.get('/getCsv', (req, res) => {
    console.log('文件地址', path.join(__dirname, 'tmp/测试文件.csv'));
    let exists = fs.existsSync(path.join(__dirname, 'tmp/测试文件.csv')); //fs.existsSync()判断当前文件夹下的文件是否存在
    if (exists) {
        res.set({
            "Content-type" : "application/octet-stream", //意思是 *未知的应用程序文件 ，*浏览器一般不会自动执行或询问执行。
            "Content-Disposition" : "attachment; filename=" + encodeURIComponent('测试文件.csv'), //指示回复的内容该以何种形式进行展现,以内联还是附件
                                                                                                  //inline是以内联的形式,attachment是以附件的形式来展现.
                                                                                                  //encodeURIComponent()用来解决中文名字导致Content-Disposition设置出错的问题
        })
        let file = fs.createReadStream(path.join(__dirname, 'tmp/测试文件.csv'), {encoding: "binary"}); //{encoding: "utf8"}传到客户端就是乱码,{encoding: "binary"}下载下来就是正常的.
        file.on("data",(chunk) => {
            console.log('chunk', chunk);
            res.write(chunk,"binary");
        });
        file.on("end",function () {
            res.end();
        });
        file.on('error', function () {
            res.send();
        })
    }
})
module.exports = router;