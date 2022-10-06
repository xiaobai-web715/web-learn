interface IFindTodo {
  taskId: number
  value: string
}
// 创建路由模块
const express = require('express')
const router = express.Router()
const client = require('../mongodb/mongodb')
// const { findData } = require('../mongodb/utils')  //用require导入泛型函数会ts的错误=> 未类型化的函数调用可能不接受类型参数
const findData = async <T>(client, options, dbName, dbTable): Promise<T> => {
  return await new Promise((resolve, reject) => {
    client.db(dbName).collection(dbTable).find(options).toArray((err, res) => {
      if (err) throw err
      resolve(res)
    })
  })
}

router.get('/todoList', (req, res) => {
  findData <IFindTodo[]>(client, {}, 'todoList', 'raskList').then(result => {
    /**
   * 设置cookie
   */
    res.cookie('monster', 'nom mon')
    res.send(JSON.stringify({
      list: result
    }))
  }).catch(err => {
    console.log(err)
  })
  console.log()
  // res.send(JSON.stringify({
  //   list: [
  //     { taskId: 1, value: '吃饭' },
  //     { taskId: 2, value: '睡觉' },
  //     { taskId: 3, value: '打豆豆' }
  //   ]
  // }))
})

const addOne = async (client, options, dbName, dbTable): Promise<void> => {
  return await new Promise((resolve, reject) => {
    client.db(dbName).collection(dbTable).insertOne(options, (err, res) => {
      if (err) reject(err)
      resolve()
    })
  })
}

router.post('/addList', (res, req) => {
  const params = res.body
  addOne(client, params, 'todoList', 'raskList').then(result => {
    req.status(200)
    req.send({ message: '数据库写入成功' })
  }).catch(err => {
    req.status(500)
    req.send({
      code: 0,
      message: err
    })
  })
})

const deleteOne = async (client, options, dbName, dbTable): Promise<void> => {
  return await new Promise((resolve, reject) => {
    // deleteOne只删除数据库当中查询到的第一条数据
    // deleteMany删除数据库当中查询到的所有数据
    client.db(dbName).collection(dbTable).deleteOne(options, (err, res) => {
      if (err) reject(err)
      resolve()
    })
  })
}

router.post('/deleteList', (res, req) => {
  const params = res.body
  console.log('params', params)
  deleteOne(client, params, 'todoList', 'raskList').then(result => {
    req.status(200)
    req.send({ message: '数据库删除成功' })
  }).catch(err => {
    req.status(500)
    req.send({
      message: err
    })
  })
})

export {}

module.exports = router
