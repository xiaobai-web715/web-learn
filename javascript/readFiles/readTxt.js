const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx')
const basePath = path.resolve('../files/txt');
// console.log('basePath', basePath)
const filesList = []

const fileDisplay = basePath => {
    const files = fs.readdirSync(basePath)
    // console.log('files', files)
    files.forEach((item) => {
        const filedir = path.join(basePath, item);
        // console.log('filedir', filedir);
        const stats = fs.statSync(filedir)
        const isDir = stats.isDirectory(); //是否是文件夹
        if (isDir) {
            fileDisplay(filedir);
        } else {
            filesList.push(filedir)
        }

    })
}
fileDisplay(basePath);
// console.log('filesList', filesList)
// fs.readFile();
const sheet1 = {
    name : 'sheet1',
    data: [
        [
            'user'
        ]
    ]
}
const data = [
    sheet1,
]
filesList.forEach(item => {
    const info = fs.readFileSync(item, 'utf8')

    info.replace(new RegExp(/"accounts":\["([0-9]+)"\]/, 'g'), (result, $1) => {
        // console.log('result', result);   
        console.log('换行符去掉', $1)
        sheet1.data.push([$1])
        // console.log('$1', JSON.parse($1.replace(new RegExp(/\n/, 'g'), '')))
    })

})
fs.writeFile('../files/excel/result.xlsx', xlsx.build(data), function(err) {
    if (err) {
        throw err
    }
    console.log('文件写入成功')
})
console.log('sheet1', sheet1)