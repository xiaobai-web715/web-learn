const express = require('express')
const router = express.Router()
const fileUpload = require('../utils/fileUpload')

router.post('/newFormData', fileUpload.any(), (req, res) => {
  // console.log('通过中间件解析的body和files', req.body, req.files)
  res.header('Content-Type', 'text/html; charset=utf-8') // 这个好像是可以解决返回的响应是中文带来的乱码问题
  res.send(`文件在node层保存成功 请求是来自浏览器还是ajax ${req.xhr ? '请求来自ajax' : '请求来自浏览器'}`)
})
module.exports = router
