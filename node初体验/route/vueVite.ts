import express, { Request, Response } from 'express'
const client = require('../mongodb/mongodb')
const { findData, addOne, paging, update } = require('../mongodb/utils')
const router = express.Router()
router.post('/user_router_list', (req: Request, res: Response) => {
  findData(client, {}, 'Vue', 'vueRouter').then(resp => {
    if (resp.length > 0) {
      res.status(200).send({
        code: 200,
        data: resp
      })
    } else {
      res.status(200).send({
        code: 0,
        data: 'no data'
      })
    }
  })
})
router.post('/userToken', (req: Request, res: Response) => {
  const params = req.body
  addOne(client, params, 'Vue', 'vueUser').then(_ => {
    res.status(200).send({
      code: 200,
      data: {
        message: 'success'
      }
    })
  }).catch(err => {
    res.status(200).send({
      code: 0,
      data: {
        message: 'filed'
      }
    })
  })
})

router.post('/admin/hosp/hospitalList', (req: Request, res: Response) => {
  const params = req.body
  paging(client, params, 'Vue', 'hospList').then(([list, total]) => {
    res.status(200).send({
      code: 200,
      data: {
        list,
        total
      }
    })
  }).catch(err => {
    res.status(200).send({
      code: 0,
      data: {
        message: err
      }
    })
  })
})

router.post('/admin/hosp/add', (req: Request, res: Response) => {
  const params = req.body
  addOne(client, params, 'Vue', 'hospList').then(_ => {
    res.status(200).send({
      code: 200,
      data: {
        message: 'success'
      }
    })
  }).catch(err => {
    res.status(200).send({
      code: 0,
      data: {
        message: 'filed'
      }
    })
  })
})
router.post('/admin/hosp/edit', (req: Request, res: Response) => {
  const params = req.body
  console.log('params', params)
  update(client, params, 'Vue', 'hospList').then(_ => {
    res.status(200).send({
      code: 200,
      data: {
        message: _
      }
    })
  }).catch(err => {
    res.status(200).send({
      code: 0,
      data: {
        message: err
      }
    })
  })
})
module.exports = router

export {}
