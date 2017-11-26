// 1.导入express
var express = require('express');

// 导入控制器
var controller = require('../controllers/article_controller.js');

// 创建路由容器
// router相当于服务器入口文件app的一个副本
var router = express.Router();

console.log(1241);

// 路由分发
router.get('/article/add',controller.showArticleAdd)//显示添加文章页面
.post('/article/add',controller.doArticleAdd)//添加文章导数据库
// .get('/article/info',controller.showArticleInfo)//显示文章详情页
// .get('/article/Edit',controller.showArticleEdit)//显示文章编辑页
// .post('/article/Edit',controller.doArticleEdit);//编辑文章

//导出路由容器
module.exports = router;