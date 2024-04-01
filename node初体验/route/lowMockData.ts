const express = require('express')
const data = require('./data/lowData')
const router = express.Router()
router.get('/table', (req, res, next) => {
    const params = req.query
    let origData = data.tableData
    Object.entries(params).forEach(([key, value]: [key: string, value: any], index) => {
        if (key === 'gender') {
            if (value.length > 0) {
                const targetGender = value.split(',')
                origData = origData.filter(item => { return targetGender.includes(item.gender) })
            }
        }
    })
    return res.status(200).send({
        tableData: origData
    })
})

export = router // 有解释说在ts的源码中更推荐这种导出方式
