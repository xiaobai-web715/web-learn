const express = require('express')
const router = express.Router()
const { requestAdmin } = require('../utils/request/requestMethods')
const { credentials } = require('../config/config')
router.post('/hospList/findAll', (req, res) => {
    const params = res.body
    const baseUrl: string = credentials.biServer.baseUrl
    const url: string = baseUrl + '/hospitalList/findAll'
    requestAdmin(url, params, 'GET').then(resp => {
        res.status(200).send(resp)
    })
})
router.post('/hospList/edit', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biServer.baseUrl
    const url: string = baseUrl + '/hospitalList/edit'
    requestAdmin(url, params).then(resp => {
        res.status(200).send(resp)
    })
})
export {}
module.exports = router
