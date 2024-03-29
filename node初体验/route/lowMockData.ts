const express = require('express')
const data = require('./data/lowData')
const router = express.Router()
router.get('/table', (req, res, next) => {
    const params = req.query
    let origData = data.tableData
    Object.entries(params).forEach(([key, value], index) => {
        if (key === 'gender') {
            const targetGender = (value as string).split(',')
            origData = origData.filter(item => { console.log('targetGender', targetGender, item.gender); return targetGender.includes(item.gender) })
        }
    })
    return res.status(200).send({
        tableData: origData
    })
})

export = router // 有解释说在ts的源码中更推荐这种导出方式
