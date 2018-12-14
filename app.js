//搭建服务器
//导入express模块
const express = require('express')
//创建服务器对象
const app = express()
//监听用户请求
app.get('/', (req, res) => {
    res.send('app')
})
//启动服务器
app.listen(8000, () => {
    console.log('http://127.0.0.1:8000')
})