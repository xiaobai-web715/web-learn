const express = require('express')
const router = express.Router()
const { requestAdmin } = require('../utils/request/requestMethods')
const { credentials } = require('../config/config')

router.post('/getUserRouter', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    const { port } = credentials.biAdmin
    const url: string = baseUrl + '/router/getUserRouter'
    requestAdmin(url, params, 'POST', { port }).then(resq => {
        console.log('resq', resq)
        res.send(resq)
    })
})

module.exports = router

export { }
