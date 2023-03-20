const xlsx = require('node-xlsx');
const fs = require('fs')


function writeJSON(file, data) {
    fs.writeFile(file, JSON.stringify(data, '', '\t'), err => {
      err ? console.error(err) : console.log('操作成功！');
    });
}

let exceldata = xlsx.parse('../files/test.xls');

let exportData = []
for (let rowId in exceldata[0]['data']) {
    let row = exceldata[0]['data'][rowId]
    console.log('row', row);
    const info = {
        label: row[1],
        value: row[0],
    }
    exportData.push(info)
}
writeJSON('../files/test.json', exportData);
// console.log('exportData', exportData)