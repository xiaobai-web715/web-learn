const express = require('express');
const router = express.Router();
const fileUpload = require('../utils/fileUpload')
const xlsx = require('node-xlsx')

router.post('/submit/xlsx', fileUpload.any() ,(req, res, next) => {
    const files = req.files; 
    let filePath = files[0].path; //这里就可以拿到对应的excel文件的路径
    let list = xlsx.parse(filePath);
    // console.log('list', list);
    //获取每一列对应的数据
    let result = []; //多个表的话会向这里面存储
    list.forEach(item => {
        let obj = {};
        let title = [];
        item.data.forEach((itemArr, index) => {
            if( index === 0){
                title = itemArr;
                itemArr.forEach((itemIndex) => {
                    obj[itemIndex] = [];
                })
            } else {
                itemArr.forEach((itemVal, itemValIndex) => {
                    obj[title[itemValIndex]].push(itemVal)
                })
            }
        })
        // result.push(obj);
    })
    console.log(result);
    res.send({
        code: 200,
        message: 'success',
        data: result,
    })
});

module.exports = router;