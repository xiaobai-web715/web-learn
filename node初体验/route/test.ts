import express = require('express')
import db = require('../mysql/index')
const router = express.Router()
router.post('/getAppVersion', (req, res) => {
    const params = req.body
    const { name } = params
    // console.log('我是请求的参数', params, `SELECT * FROM text_app WHERE name = '${name}' AND version = '${version}'`)
    db.query(`SELECT * FROM text_app WHERE name = '${name}'`, (err, result, fields) => {
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(200).json({
                code: 404,
                message: 'db error'
            })
        }
    })
})
export = router
