const express = require('express')
const router = express.Router()
const { requestAdmin } = require('../utils/request/requestMethods')
const { credentials } = require('../config/config')

router.post('/login', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biServerUser.baseUrl
    const { port } = credentials.biServerUser
    console.log('我是传过来的采纳数', params, port)
    const url: string = baseUrl + '/login'
    requestAdmin(url, params, 'post', { port }).then(resq => {
        console.log('resq', resq)
        res.send(resq)
    })
})
router.post('/register', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biServerUser.baseUrl
    const { port } = credentials.biServerUser
    const url: string = baseUrl + '/register'
    requestAdmin(url, params, 'post', { port }).then(resq => {
        console.log('resq', resq)
        res.send(resq)
    })
})
export {}
module.exports = router
