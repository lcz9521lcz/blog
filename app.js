//搭建服务器模块
//导入express模块
const express = require('express')
//导入body-parser模块---解析用户提交的表单数据
const bodyParser = require('body-parser')
//导入时间格式化模块---moment
const moment = require('moment')
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

//配置指定模板引擎
app.set('view engine', 'ejs')
//配置指定模板页面存储路径---默认存储路径是views目录
// app.set('views', 'views')
//注册中间件把node_modules文件夹托管为静态资源文件---以便views目录下的文件引用此文件夹下的包
app.use('/node_modules/', express.static('./node_modules'))
//注册解析表单数据的中间件
app.use(bodyParser.urlencoded({ extended: false }))
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
    // console.log(req)
    // console.log(req.body)
    const body = req.body//通过模块解析后的数据会存储在req请求对象中
    // console.log(body)//{ username: 'tom', password: '11', nickname: '11' }
    //判断用户输入的数据是否完整
    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0) {
        return res.send({ msg: '请输入完整的用户信息', status: 500 })
    }
    //连接数据库查询用户名是否重复
    //执行sql语句
    //sql查重语句
    const checkSql = 'select count(*) as count from users where username = ?'
    conn.query(checkSql, body.username, (err, result) => {
        // console.log(err)
        if (err) return res.status(500).send({ msg: '查询的数据不存在', status: 500 })
        // console.log(res)//[ RowDataPacket { count: 0 } ]
        if (result[0].count !== 0) return res.status(500).send({ msg: '用户名已存在请更换后重新注册', status: 500 })
        //如果以上代码都满足---执行用户新增
        //获取当前注册时间
        const ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        // console.log(ctime)//2018-12-18 16:01:04
        body.ctime = ctime//追加时间元素到body对象
        //新增用户sql语句
        const addSql = 'insert into users set ?'
        conn.query(addSql, body, (err, result) => {
            if (err) return res.status(500).send({ msg: '注册用户失败', status: 500 })
            // console.log(result)
            if (result.affectedRows !== 1) res.status(500).send({ msg: '注册用户失败', status: 500 })
            //以上条件满足的话表示用户注册成功
            res.send({ status: 200, msg: '注册成功' })
        })
    })
})
//监听用户请求登录
app.post('/login', (req, res) => {
    //获取用户请求的表单数据
    const body = req.body
    // console.log(body)//{ username: 'ls', password: '123' }
    //匹配数据库中用户的账号密码判断能否登录
    //执行sql语句查询用户是否存在
    const checSql = 'select * from users where username = ? and password = ?'
    conn.query(checSql, [body.username, body.password], (err, result) => {
        if (err) return res.send({ msg: '用户不存在', status: 500 })
        // console.log(result)//用户对象信息
        if (result.length !== 1) return res.send({ msg: '用户不存在', status: 500 })
        //如果以上二个条件都满足
        res.send({ msg: '登录成功', status: 200 })
    })
})
//监听用户请求登录账号
app.post('/login', (req, res) => {
    res.send({ status: 200, msg: '登录成功' })
})
//启动服务器
app.listen(8000, () => {
    console.log('http://127.0.0.1:8000')
})