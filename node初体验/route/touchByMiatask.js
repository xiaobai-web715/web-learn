const express = require('express')
const xlsx = require('node-xlsx')
const router = express.Router()
const path = require('path')
const fs = require('fs')

// get请求获取csv文件
router.get('/getCsv', (req, res) => {
    console.log('文件地址', path.join(__dirname, 'tmp/测试文件.csv'))
    const exists = fs.existsSync(path.join(__dirname, 'tmp/测试文件.csv')) // fs.existsSync()判断当前文件夹下的文件是否存在
    if (exists) {
        res.set({
            'Content-type': 'application/octet-stream', // 意思是 *未知的应用程序文件 ，*浏览器一般不会自动执行或询问执行。
            'Content-Disposition': 'attachment; filename=' + encodeURIComponent('测试文件.csv') // 指示回复的内容该以何种形式进行展现,以内联还是附件
            // inline是以内联的形式,attachment是以附件的形式来展现.
            // encodeURIComponent()用来解决中文名字导致Content-Disposition设置出错的问题
        })
        const file = fs.createReadStream(path.join(__dirname, 'tmp/测试文件.csv'), { encoding: 'binary' }) // {encoding: "utf8"}传到客户端就是乱码,{encoding: "binary"}下载下来就是正常的.
        file.on('data', (chunk) => {
            console.log('chunk', chunk)
            res.write(chunk, 'binary')
        })
        file.on('end', function () {
            res.end()
        })
        file.on('error', function () {
            res.send()
        })
    }
})

// get请求获取数据列表并保存的excel里面
router.get('/sn/downloadExcel', (req, res) => {
    const list = {
        code: 200,
        data: [
            {
                title: '星期一',
                weather: '多云'
            },
            {
                title: '星期二',
                weather: '阴天'
            }
        ]
    }
    if (list.code === 200) {
        const excelData = [['日期', '天气']]
        const fields = ['title', 'weather']
        const data = list.data ? list.data : []
        data.forEach(itemObj => {
            const result = []
            fields.forEach(item => {
                result.push(itemObj[item])
            })
            excelData.push(result)
        })
        // 后面的这个空对象可以设置表格宽度(就像下面这个配置)
        // const sheetOptions = {'!cols': [{wch: 6}, {wch: 7}, {wch: 10}, {wch: 20}]};
        const buffer = xlsx.build([{ name: '天气数据', data: excelData }], {})
        res.header('Content-Type', 'multipart/form-data') // 设置请求头
        // 响应头指示回复的内容该以何种形式展示 attachment意味着应该下载到本地 fileName=后面跟文件的名字
        res.header('Content-Disposition', 'attachment;fileName=batch.xlsx')
        res.status(200).send(buffer)
    }
})
module.exports = router
