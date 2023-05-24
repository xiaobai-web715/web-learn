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
router.post('/getUserImage', (req, res) => {
    // 获取用户信息中包含图片的话最好的实现有两种形式(一种是图片放到服务器上变成可以访问的链接的形式一种是分成两个接口,图片单独获得,组合在一起的话会拖慢接口响应进度)
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    const url: string = baseUrl + '/user/getUserImage'
    console.log('params...', params)
    requestAdmin(url, params, 'POSTUrlencoded').then(({ headers, data }) => {
        // console.log('headers', headers, data)
        // ??当这里将响应的头部信息写入后会报一个content-length的错误
        // Object.entries(headers).forEach(([k, v]) => {
        //     res.header(k, v)
        // })
        res.send(data)
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
