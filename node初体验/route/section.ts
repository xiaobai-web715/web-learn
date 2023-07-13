const express = require('express')
const router = express.Router()
const { requestAdmin } = require('../utils/request/requestMethods')
const { credentials } = require('../config/config')
router.get('/sectionList', (req, res, next) => {
    const params = req.query
    const url = String(credentials.biAdmin.baseUrl) + '/section/query'
    requestAdmin(url, params, 'GET', req).then(resq => {
        res.status(200).send(resq)
    })
})
router.get('/getHospSection', (req, res, next) => {
    const params = req.query
    const url = String(credentials.biAdmin.baseUrl) + '/section/get/hospSection'
    requestAdmin(url, params, 'GET', req).then(resq => {
        console.log('resq', resq)
        res.status(200).send(resq)
    })
})
router.post('/setHospSection', (req, res, next) => {
    const params = req.body
    const url = String(credentials.biAdmin.baseUrl) + '/section/set/hospSection'
    requestAdmin(url, params, 'POST', req).then(resq => {
        res.status(200).send(resq)
    })
})
module.exports = router
export {}
