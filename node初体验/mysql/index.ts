const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '192.168.220.192',
    user: 'lxh',
    password: '5551340xinghua',
    database: 'lxh'
})
connection.connect((err) => {
    console.log('数据库连接报错', err)
})

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
