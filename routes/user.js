const express = require('express')
const router = express.Router()

//导入业务处理模块
const ctrl = require('../controller/user.js')
router.get('/register', ctrl.getRegisterHandler)
router.get('/login', ctrl.getLoginHandler)
router.post('/register', ctrl.postRegisterHandler)
router.post('/login', ctrl.postLoginHandler)
module.exports = router 