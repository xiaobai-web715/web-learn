const express = require('express')
const router = express.Router()
const { requestAdmin } = require('../utils/request/requestMethods')
const { credentials } = require('../config/config')
router.post('/hospList/query', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biServer.baseUrl
    const url: string = baseUrl + '/hospitalList/query'
    requestAdmin(url, params, 'POST').then(resp => {
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
router.post('/hospList/add', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biServer.baseUrl
    const url: string = baseUrl + '/hospitalList/add'
    requestAdmin(url, params).then(resp => {
        res.status(200).send(resp)
    })
})
export { }
module.exports = router
