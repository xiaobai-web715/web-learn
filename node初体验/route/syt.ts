const express = require('express')
const router = express.Router()
const { requestAdmin } = require('../utils/request/requestMethods')
const { credentials } = require('../config/config')
router.post('/hospList/findAll', (req, res) => {
    const params = res.body
    const baseUrl: string = credentials.biServer.baseUrl
    const url: string = baseUrl + '/hospitalList/findAll'
    console.log('params', params)
    requestAdmin(url, 'GET', params).then(resp => {
        console.log('我是请求接口返回的结果', resp)
        res.status(200).send(resp)
    })
})
export {}
module.exports = router
