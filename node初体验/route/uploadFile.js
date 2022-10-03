const express = require('express')
const router = express.Router()
const fileUpload = require('../utils/fileUpload')
class NewsletterSigup {
  constructor ({ phone, password }) {
    this.phone = phone
    this.password = password
    this.reg = /^1[0-9]{10}/g
  }

  save (callabck) {
    const target = this.reg.test(this.phone)
    callabck(target)
  }
}

router.post('/newFormData', fileUpload.any(), (req, res) => {
  const { phone, password } = req.body
  if (phone && password) {
    new NewsletterSigup({ phone, password }).save((result) => {
      if (result) {
        res.status(200).send({ message: 'success' })
      } else {
        res.status(200).send({ message: '请输入正确的手机号' })
      }
    })
  } else {
    res.status(200).send({
      ...req.body
    })
  }
})
module.exports = router
