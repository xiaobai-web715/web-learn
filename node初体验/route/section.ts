const express = require('express')
const router = express.Router()
const { requestAdmin } = require('../utils/request/requestMethods')
const { credentials } = require('../config/config')
router.get('/sectionList', (req, res, next) => {
    const params = req.params
    const url = String(credentials.biAdmin.baseUrl) + '/section/query'
    console.log('get请求express的参数', params)
    requestAdmin(url, params, 'GET').then(resq => {
        console.log('resq', resq)
        res.status(200).send(resq)
    })
})
module.exports = router
export {}
