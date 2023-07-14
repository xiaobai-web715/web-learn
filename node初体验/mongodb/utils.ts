const getNextSquenceValue = async (client, dbName, dbTable, keyName): Promise<any> => {
    // return await new Promise((resolve, reject) => {
    return client.db(dbName).collection(dbTable).findOneAndUpdate(
        { _id: keyName },
        { $inc: { value: 1 } },
        { new: true }
    )
    // })
}

const findData = async <T>(client, options, dbName, dbTable): Promise<T> => {
    return await new Promise((resolve, reject) => {
        client.db(dbName).collection(dbTable).find(options).toArray((err, res) => {
            if (err) throw err
            resolve(res)
        })
    })
}

const noIncreaseAddOne = async (client, options, dbName, dbTable): Promise<void> => {
    return await new Promise((resolve, reject) => {
    // 添加一个判断来看看数据库中是否已经存在某个数据了
        client.db(dbName).collection(dbTable).insertOne(options, (err, res) => {
            if (err) reject(err)
            resolve()
        })
    })
}

const addOne = async (client, options, dbName, dbTable): Promise<void> => {
    return await new Promise((resolve, reject) => {
    // 添加一个判断来看看数据库中是否已经存在某个数据了
        getNextSquenceValue(client, dbName, 'hospListNum', 'hospId').then(res => {
            const _id = res.value.value
            options._id = _id
            client.db(dbName).collection(dbTable).insertOne(options, (err, res) => {
                if (err) reject(err)
                resolve(err)
            })
        }).catch(err => { console.log(err) })
    // console.log('options', options)
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

// 分页查询
const paging = async (client, options, dbName, dbTable): Promise<object> => {
    // 不传page与pageSize就是默认10条默认第一页
    const skip = ((options.page ? options.page : 1) - 1) * (options.pageSize ? options.pageSize : 10)
    const promiseArr = []
    const search = ['name', 'nature']
    const params = {}
    search.forEach(item => {
        if (options[item]) {
            params[item] = options[item]
        }
    })
    promiseArr.push(
        new Promise((resolve, reject) => {
            client.db(dbName).collection(dbTable).find(params, { limt: options.pageSize ? options.pageSize : 10, skip }).toArray((err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    )
    promiseArr.push(
        new Promise((resolve, reject) => {
            client.db(dbName).collection(dbTable).countDocuments(params, (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    )
    return await Promise.all(promiseArr)
}

const update = async (client, options, dbName, dbTable): Promise<any> => {
    console.log('options', options)
    return await new Promise((resolve, reject) => {
        client.db(dbName).collection(dbTable).update({ _id: options._id }, { $set: options }).then(res => {
            resolve('success')
        }).catch(err => {
            reject(err)
        })
    })
}
export = {
    findData,
    noIncreaseAddOne,
    addOne,
    deleteOne,
    paging,
    update
}
