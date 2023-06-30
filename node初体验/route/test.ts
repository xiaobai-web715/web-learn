const express = require('express')
const router = express.Router()
const db = require('../mysql/index')
router.post('/getAppVersion', (req, res) => {
    const params = req.body
    const { name, version } = params
    console.log('我是请求的参数', params, `SELECT * FROM text_app WHERE name = '${name}' AND version = '${version}'`)
    db.query(`SELECT * FROM text_app WHERE name = '${name}' AND version = '${version}'`, (err, result, fields) => {
        console.log('err', err)
        console.log('result', result)
        console.log('fields', fields)
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(-1)
        }
    })
})
module.exports = router
export {}
