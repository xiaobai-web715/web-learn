const mysql = require('mysql')

let connection
try {
    connection = mysql.createConnection({
        host: '192.168.220.192',
        user: 'lxh',
        password: '5551340xinghua',
        database: 'lxh'
    })
    connection.connect()
} catch (err) {
    console.log('数据库没有连接成功')
}

const query = (select, callback): void => {
    if (connection) {
        connection.query(select, callback)
    } else {
        callback()
    }
}

module.exports = {
    query
}

export {}
