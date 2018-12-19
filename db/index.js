//下载mysql模块---连接数据库
//导入mysql模块
const mysql = require('mysql')
//创建连接对象
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog'
})
module.exports = conn