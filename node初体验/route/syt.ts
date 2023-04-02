const express = require('express')
const router = express.Router()
const { requestAdmin } = require('../utils/request/requestMethods')
const { credentials } = require('../config/config')
router.post('/hospList/query', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biServer.baseUrl
    const url: string = baseUrl + '/query'
    requestAdmin(url, params, 'POST').then(resp => {
        res.status(200).send(resp)
    })
})
router.post('/hospList/add', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biServer.baseUrl
    let url: String = ''
    if (params.id) {
        url = baseUrl + '/edit'
    } else {
        url = baseUrl + '/add'
    }
    requestAdmin(url, params).then(resp => {
        res.status(200).send(resp)
    })
})
router.post('/hospList/delete', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biServer.baseUrl
    const url: string = baseUrl + '/delete'
    requestAdmin(url, params).then(resp => {
        res.status(200).send(resp)
    })
})
router.post('/hospList/get/info', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biServer.baseUrl
    const url: string = baseUrl + '/get/info'
    requestAdmin(url, params).then(resp => {
        res.status(200).send(resp)
    })
})
export { }
module.exports = router
