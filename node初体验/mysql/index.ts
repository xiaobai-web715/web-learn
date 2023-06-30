const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '192.168.220.192',
    user: 'lxh',
    password: '5551340xinghua',
    database: 'lxh'
})
connection.connect()

const query = (select, callback): void => {
    connection.query(select, callback)
}

module.exports = {
    query
}

export {}
