import express from 'express'
import requestMethods from '../utils/request/requestMethods'
import credentials from '../config/config'
const router = express.Router()
const { requestAdmin } = requestMethods

router.post('/addPath', (req, res, next) => {
    const params = req.body
    const url = (credentials.biAdmin.baseUrl) as string + '/plugin/set/websiteDomPath'
    console.log('我是获取到的参数值', params)
    requestAdmin(url, params, 'post').then(res => {
        console.log('我是请求所获取的参数', res)
    }).catch(err => {
        console.error(err)
    })
})
