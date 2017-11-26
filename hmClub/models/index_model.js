//首页模块本身不提供数据库支持，它的职责（1）就是帮我们管理其他模块的模型数据 （2）连接数据库

var articleModel = require('./article_model.js');

var userModel = require('./user_model.js');

// 1.导入mongoose
var mongoose = require('mongoose');

// 2.连接数据库
// console.log(23423424);
mongoose.connect('mongodb://127.0.0.1/hmClub');

//3.导入模块
/**
 * 首页模型的职责是维护其他模块的模型，它本身不负责维护数据库的数据
 *  * 一个网站的首页其实就是将其他模块的数据显示在一起
 */
module.exports = {
  User: userModel,
  Article: articleModel
};