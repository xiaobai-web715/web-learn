const express = require('express')
const router = express.Router()
const fileUpload = require('../utils/fileUpload')
const FileBuffer = require('../utils/request/filebuffer')
const { requestAdmin } = require('../utils/request/requestMethods')
const { credentials } = require('../config/config')

router.post('/login', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    const url: string = baseUrl + '/user/login'
    requestAdmin(url, params, 'POST').then(resq => {
        res.send(resq)
    })
})
router.post('/register', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    const url: string = baseUrl + '/user/register'
    requestAdmin(url, params, 'POST').then(resq => {
        res.send(resq)
    })
})
router.post('/getUserInfo', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    const url: string = baseUrl + '/user/getUserInfo'
    console.log('params...', params)
    requestAdmin(url, params, 'POSTUrlencoded').then(resq => {
        console.log('req', resq)
        res.send(resq)
    })
})
router.post('/userImage', fileUpload.any(), (req, res) => {
    const file = req.files[0]
    const otherParams = req.body
    const params = {
        // filename: file.filename,
        file: new FileBuffer(file),
        uid: otherParams.uid
    }
    console.log('otherParams', otherParams)
    const url = String(credentials.biAdmin.baseUrl) + '/user/uploadImage'
    requestAdmin(url, params, 'POSTFormData').then(resq => {
        // console.log('请求文件的resq', resq)
        res.send(resq)
    })
})
export { }
module.exports = router
