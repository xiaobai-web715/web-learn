const express = require('express')
const router = express.Router()
const { requestAdmin } = require('../utils/request/requestMethods')
const { credentials } = require('../config/config')

router.post('/getUserRouter', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biServiceRouter.baseUrl
    const { port } = credentials.biServiceRouter
    const url: string = baseUrl + '/getUserRouter'
    requestAdmin(url, params, 'post', { port }).then(resq => {
        console.log('resq', resq)
        res.send(resq)
    })
})

module.exports = router

export { }