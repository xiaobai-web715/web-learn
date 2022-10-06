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

export {}

module.exports = router
