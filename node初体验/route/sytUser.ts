import express = require('express')
import requestMethods = require('../utils/request/requestMethods')
import credentials = require('../config/config')
import fileUpload = require('../utils/fileUpload')
import FileBuffer = require('../utils/request/filebuffer')
const router = express.Router()
const { requestAdmin } = requestMethods

router.post('/login', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    const url: string = baseUrl + '/user/login'
    requestAdmin(url, params, 'POST').then(resq => {
        res.send(resq)
    }).catch((err) => {
        res.status(404).send(err)
    })
})
router.post('/register', (req, res) => {
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    const url: string = baseUrl + '/user/register'
    requestAdmin(url, params, 'POST', req).then(resq => {
        res.send(resq)
    }).catch((err) => {
        res.status(404).send(err)
    })
})
router.post('/getUserImage', (req, res) => {
    // 获取用户信息中包含图片的话最好的实现有两种形式(一种是图片放到服务器上变成可以访问的链接的形式一种是分成两个接口,图片单独获得,组合在一起的话会拖慢接口响应进度)
    const params = req.body
    const baseUrl: string = credentials.biAdmin.baseUrl
    const url: string = baseUrl + '/user/getUserImage'
    requestAdmin(url, params, 'POSTUrlencoded', req).then((resp) => {
        // console.log('headers', headers, data)
        // ??当这里将响应的头部信息写入后会报一个content-length的错误
        // Object.entries(headers).forEach(([k, v]) => {
        //     res.header(k, v)
        // })
        const { headers, data } = resp
        if (headers) {
            res.send(data)
        } else {
            res.send(resp)
        }
    }).catch((err) => {
        res.status(404).send(err)
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
    const url = String(credentials.biAdmin.baseUrl) + '/user/uploadImage'
    requestAdmin(url, params as IParams, 'POSTFormData', req).then(resq => {
        res.send(resq)
    }).catch((err) => {
        res.status(404).send(err)
    })
})
router.post('/getLoginVer', (req, res) => {
    const params = req.body
    const url = String(credentials.biAdmin.baseUrl) + '/user/slidingLogin'
    requestAdmin(url, params as IParams, 'POST').then(resq => {
        console.log('resq', resq)
        res.send(resq)
    }).catch((err) => {
        res.status(404).send(err)
    })
})
router.post('/slide/distance', (req, res) => {
    const params = req.body
    const url = String(credentials.biAdmin.baseUrl) + '/user/slide/distance'
    requestAdmin(url, params as IParams, 'POSTUrlencoded').then(resq => {
        console.log('resq', resq)
    }).catch((err) => {
        console.log('err', err)
    })
})
export = router
