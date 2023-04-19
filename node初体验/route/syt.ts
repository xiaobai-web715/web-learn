const express = require('express')
const router = express.Router()
const { requestAdmin } = require('../utils/request/requestMethods')
const { credentials } = require('../config/config')
router.post('/hospList/query', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    const url: string = baseUrl + '/list/query'
    requestAdmin(url, params, 'POST').then(resp => {
        res.status(200).send(resp)
    })
})
router.post('/hospList/add', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    let url: String = ''
    if (params.id) {
        url = baseUrl + '/list/edit'
    } else {
        url = baseUrl + '/list/add'
    }
    requestAdmin(url, params).then(resp => {
        res.status(200).send(resp)
    })
})
router.post('/hospList/delete', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    const url: string = baseUrl + '/list/delete'
    requestAdmin(url, params).then(resp => {
        res.status(200).send(resp)
    })
})
router.post('/hospList/get/info', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    const url: string = baseUrl + '/list/get/info'
    requestAdmin(url, params).then(resp => {
        res.status(200).send(resp)
    })
})
router.post('/hospList/get/briefInfo', (req, res) => {
    const params = req.body
    const url: string = String(credentials.biAdmin.baseUrl) + '/list/get/briefInfo'
    console.log('url', url)
    requestAdmin(url, params).then(resp => {
        res.status(200).send(resp)
    })
})
export { }
module.exports = router
