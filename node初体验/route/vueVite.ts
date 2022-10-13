import express, { Request, Response } from 'express'
const client = require('../mongodb/mongodb')
const { findData, addOne } = require('../mongodb/utils')
const router = express.Router()
router.post('/user_router_list', (req: Request, res: Response) => {
  findData(client, {}, 'Vue', 'vueRouter').then(resp => {
    if (resp.length > 0) {
      console.log('resp', resp)
      res.status(200).send({
        data: resp
      })
    } else {
      res.status(200).send({
        data: 'no data'
      })
    }
  })
})
router.post('/userToken', (req: Request, res: Response) => {
  const params = req.body
  addOne(client, params, 'Vue', 'vueUser').then(_ => {
    res.status(200).send({
      data: {
        code: 200,
        message: 'success'
      }
    })
  }).catch(err => {
    res.status(200).send({
      data: {
        code: 0,
        message: 'filed'
      }
    })
  })
})
module.exports = router

export {}
