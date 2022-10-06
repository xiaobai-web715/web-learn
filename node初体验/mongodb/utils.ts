const findData = async <T>(client, options, dbName, dbTable): Promise<T> => {
  return await new Promise((resolve, reject) => {
    client.db(dbName).collection(dbTable).find(options).toArray((err, res) => {
      if (err) throw err
      resolve(res)
    })
  })
}

const addOne = async (client, options, dbName, dbTable): Promise<void> => {
  return await new Promise((resolve, reject) => {
    // 添加一个判断来看看数据库中是否已经存在某个数据了
    client.db(dbName).collection(dbTable).insertOne(options, (err, res) => {
      if (err) reject(err)
      resolve()
    })
  })
}

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

module.exports = {
  findData,
  addOne,
  deleteOne
}
