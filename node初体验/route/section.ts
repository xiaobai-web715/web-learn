import express = require('express')
import requestMethods = require('../utils/request/requestMethods')
import credentials = require('../config/config')
const router = express.Router()
const { requestAdmin } = requestMethods
router.get('/sectionList', (req, res, next) => {
    const params = req.query
    const url = String(credentials.biAdmin.baseUrl) + '/section/query'
    requestAdmin(url, params as IParams, 'GET', req).then(resq => {
        res.status(200).send(resq)
    }).catch((err) => {
        res.status(404).send(err)
    })
})
router.get('/getHospSection', (req, res, next) => {
    const params = req.query
    const url = String(credentials.biAdmin.baseUrl) + '/section/get/hospSection'
    requestAdmin(url, params as IParams, 'GET', req).then(resq => {
        res.status(200).send(resq)
    }).catch((err) => {
        res.status(404).send(err)
    })
})
router.post('/setHospSection', (req, res, next) => {
    const params = req.body
    const url = String(credentials.biAdmin.baseUrl) + '/section/set/hospSection'
    requestAdmin(url, params, 'POST', req).then(resq => {
        res.status(200).send(resq)
    }).catch((err) => {
        res.status(404).send(err)
    })
})
export = router
