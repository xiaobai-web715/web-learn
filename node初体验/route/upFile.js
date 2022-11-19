const express = require('express')
const router = express.Router()
const fileUpload = require('../utils/fileUpload')
/* eslint-disable camelcase */
const xlsx_read = require('node-xlsx')
/* eslint-ensable camelcase */
const { utils, write } = require('xlsx')

router.post('/submit/xlsx', fileUpload.any(), (req, res, next) => {
    const files = req.files
    const filePath = files[0].path // 这里就可以拿到对应的excel文件的路径
    const list = xlsx_read.parse(filePath)
    // console.log('list', list);
    // 获取每一列对应的数据
    const result = [] // 多个表的话会向这里面存储
    list.forEach(item => {
        const obj = {}
        let title = []
        item.data.forEach((itemArr, index) => {
            if (index === 0) {
                title = itemArr
                itemArr.forEach((itemIndex) => {
                    obj[itemIndex] = []
                })
            } else {
                itemArr.forEach((itemVal, itemValIndex) => {
                    obj[title[itemValIndex]].push(itemVal)
                })
            }
        })
        result.push(obj)
    })
    console.log(result, list)

    /* eslint-disable no-unused-vars */
    const sheeltName = list[0].name
    /* eslint-ensable no-unused-vars */
    const sheeltData = list[0].data
    const ws = utils.aoa_to_sheet(sheeltData)// 这里去构造数据流才是重点
    console.log('ws', ws)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'data')
    const file = write(wb, { bookType: 'xlsx', type: 'buffer' })
    res.header('Content-Disposition', 'attachment; filename=SheetJSDrash.xlsx')
    // res.header('Content-Disposition', 'attachment; filename="SheetJSDrash.xlsx"'); "SheetJSDrash.xlsx"这样的写法是错误的,通过res.headers['content-disposition'].split('=')[1]获得字符串好像赋予download会出问题
    res.header('Context-Type', 'application/vnd.ms-excel') // 这里并不是重点(只是告诉该以怎样的形式去下载)
    // res.header('Context-Type', 'application/zip');
    res.status(200).send(file)
})

module.exports = router
