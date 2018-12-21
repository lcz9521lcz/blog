module.exports = {
    getIndexHandler(req, res) {
        // res.render(指定需要动态渲染的页面,对象)---语法
        //使用res.render()方法之前必须先配置模板引擎---index.ejs后缀名可以不写
        res.render('index', {
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    }
}