const express = require('express')
const router = express.Router()
const { requestAdmin } = require('../utils/request/requestMethods')
const { credentials } = require('../config/config')

router.post('/login', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    const { port } = credentials.biAdmin
    console.log('我是传过来的采纳数', params, port)
    const url: string = baseUrl + '/user/login'
    requestAdmin(url, params, 'post', { port }).then(resq => {
        console.log('resq', resq)
        res.send(resq)
    })
})
router.post('/register', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    const { port } = credentials.biAdmin
    const url: string = baseUrl + '/user/register'
    requestAdmin(url, params, 'post', { port }).then(resq => {
        console.log('resq', resq)
        res.send(resq)
    })
})
export {}
module.exports = router
