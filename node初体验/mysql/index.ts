import mysql = require('mysql')

// mysql的createConnection与createPool方法都可以进行连接, createPool是创建一个连接池(当查询数据库之后可以将连接释放的连接池)

const pool = mysql.createPool({
    host: '192.168.220.192',
    user: 'lxh',
    password: '5551340xinghua',
    database: 'lxh'
})

const query = (select, callback): void => {
    pool.getConnection((err, connection) => {
        // console.log('connection', connection)
        if (err) {
            // console.log('与数据库建立连接失败:' + JSON.stringify(err))
            callback()
        } else {
            // console.log('数据库建立连接成功')
            connection.query(select, (err, data) => {
                if (err) {
                    // console.log('查询失败:' + JSON.stringify(err))
                    return callback()
                }
                callback(err, data)
                connection.release() // 释放连接
            })
        }
    })
}

export = {
    query
}
