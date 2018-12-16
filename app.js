//搭建服务器模块
//导入express模块
const express = require('express')
//创建服务器对象
const app = express()
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
//执行sql语句
conn.query('select * from users', (err, res) => {
    if (err) return console.log(err.message)
    console.log(res)
})
//配置指定模板引擎
app.set('view engine', 'ejs')
//配置指定模板页面存储路径---默认存储路径是views目录
// app.set('views', 'views')
//注册中间件把node_modules文件夹托管为静态资源文件---以便views目录下的文件引用此文件夹下的包
app.use('/node_modules/', express.static('./node_modules'))
//事件监听用户请求首页
app.get('/', (req, res) => {
    // res.render(指定需要动态渲染的页面,对象)---语法
    //使用res.render()方法之前必须先配置模板引擎---index.ejs后缀名可以不写
    res.render('index', {})
})
//监听用户请求渲染注册页面
app.get('/register', (req, res) => {
    res.render('user/register.ejs', {})
})
//监听用户请求渲染登录页面
app.get('/login', (req, res) => {
    res.render('user/login.ejs')
})
//监听用户请求注册账号
app.post('/register', (req, res) => {
    res.send({ status: 200, msg: '注册成功' })
})
//启动服务器
app.listen(8000, () => {
    console.log('http://127.0.0.1:8000')
})