import express = require('express')
import requestMethods = require('../utils/request/requestMethods')
import config = require('../config/config')
const router = express.Router()
const { requestAdmin } = requestMethods
const { credentials } = config
router.post('/getUserRouter', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    const url: string = baseUrl + '/router/getUserRouter'
    requestAdmin(url, params, 'POST', req).then(resq => {
        console.log('resq', resq)
        res.send(resq)
    }).catch((err) => {
        res.status(404).send(err)
    })
})

// module.exports = router

export = router
