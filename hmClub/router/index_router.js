// 导入express
var express = require('express');

// 导入控制器
var controller = require('../controllers/index_controller.js');


// 2.创建路由容器
// router 相当于服务器入口文件的app的一个副本(mini-app)
var router = express.Router();

// 3.路由分发(分发给c层)
router.get('/',controller.showIndex) // 显示首页
// .get('/index/search',controller.doIndexSearch)//搜素
// .get('index/page',controller.doIndexPage);//分页


//4.导出路由容器
module.exports = router;