// 导入express
var express = require('express');

// 导入控制器
var controller = require('../controllers/user_controller');

// 创建路由容器

var router = express.Router();


// 路由分发
router.get('/register',controller.showRegister)//显示注册页面
.post('/register',controller.doRegister)//用户注册
.get('/login',controller.showLogin)//显示登录页面
.post('/login',controller.doLogin)//登录
.get('/logout',controller.doLogout)//用户注销


module.exports = router;