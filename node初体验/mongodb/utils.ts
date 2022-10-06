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
    client.db(dbName).collection(dbTable).insertOne(options, (err, res) => {
      if (err) reject(err)
      resolve()
    })
  })
}

module.exports = {
  findData,
  addOne
}
