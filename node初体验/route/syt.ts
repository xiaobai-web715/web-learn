import express = require('express')
import requestMethods = require('../utils/request/requestMethods')
import config = require('../config/config')
const router = express.Router()
const { requestAdmin } = requestMethods
const { credentials } = config
router.post('/query', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    const url: string = baseUrl + '/list/query'
    requestAdmin(url, params, 'POST', req).then(resp => {
        res.status(200).send(resp)
    }).catch((err) => {
        res.status(404).send(err)
    })
})
router.post('/add', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    let url: string = ''
    if (params.id) {
        url = baseUrl + '/list/edit'
    } else {
        url = baseUrl + '/list/add'
    }
    requestAdmin(url, params, 'POST', req).then(resp => {
        res.status(200).send(resp)
    }).catch((err) => {
        res.status(404).send(err)
    })
})
router.post('/delete', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    const url: string = baseUrl + '/list/delete'
    requestAdmin(url, params, 'POST', req).then(resp => {
        res.status(200).send(resp)
    }).catch((err) => {
        res.status(404).send(err)
    })
})
router.post('/get/info', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    const url: string = baseUrl + '/list/get/info'
    requestAdmin(url, params, 'POST', req).then(resp => {
        res.status(200).send(resp)
    }).catch((err) => {
        res.status(404).send(err)
    })
})
router.post('/get/briefInfo', (req, res) => {
    const params = req.body
    const url: string = String(credentials.biAdmin.baseUrl) + '/list/get/briefInfo'
    requestAdmin(url, params, 'POST', req).then(resp => {
        res.status(200).send(resp)
    }).catch((err) => {
        res.status(404).send(err)
    })
})
export = router
// module.exports = router
