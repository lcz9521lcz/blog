//搭建服务器模块
//导入express模块
const express = require('express')
//导入body-parser模块---解析用户提交的表单数据
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const session = require('express-session')
//创建服务器对象
const app = express()
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

//配置指定模板引擎
app.set('view engine', 'ejs')
//配置指定模板页面存储路径---默认存储路径是views目录
// app.set('views', 'views')//---可以省略

//注册中间件把node_modules文件夹托管为静态资源文件---以便views目录下的文件引用此文件夹下的包
app.use('/node_modules/', express.static('./node_modules'))//配置虚拟路径方便文件的调用查找

//注册解析表单数据的中间件
app.use(bodyParser.urlencoded({ extended: false }))

// //导入首页路由模块
// const indexRouter = require('./routes/index.js')
// //导入用户路由模块
// const userRouter = require('./routes/user')
// //事件监听用户请求首页
// app.use(indexRouter)
// //监听用户请求渲染注册页面
// app.use(userRouter)
//使用循环的方式进行用户的自动注册---需要导入fs模块
fs.readdir(path.join(__dirname, './routes'), (err, filename) => {
    if (err) return console.log('读取目录文件失败')
    // console.log(filename)//[ 'index.js', 'user.js' ]
    filename.forEach(fname => {
        // console.log(fname)//index.js   user.js
        // console.log(path.join(__dirname, './routes', fname))//D:\Gittest\blog\blog\routes\index.js
        const router = require(path.join(__dirname, './routes', fname))
        app.use(router)
    })
})

//启动服务器
app.listen(8000, () => {
    console.log('http://127.0.0.1:8000')
})