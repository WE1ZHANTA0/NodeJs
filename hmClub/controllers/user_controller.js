var controller = module.exports;
var indexController = require('./index_controller.js');
var UserModel = require('../models/index_model.js').User;

var errHandler = require('../errHandle.js');
// 1.显示注册页面
controller.showRegister = function (req, res) {
  res.render('register.html');
}


// 2.用户注册
controller.doRegister = function (req, res) {
  /**
   * 思路分析
   * 1.获取post请求参数
   * 2.查询数据库根据邮箱
   * 3.添加到数据库
   * 4.响应返回
   */

  var body = req.body;

  //  console.dir(body);
  // 查询数据库
  UserModel.find({
    email: body.email
  }, function (err, doc) {
    //这里只能根据doc是否存在来判断，不能根据err来判断
    //err只是表示数据库的操作过程是否失败，与结果无关
    if (doc.length === 0) {
      // 数据库中没有邮箱,添加到数据库
      UserModel.create(body, function (err) {
        if (err) {
          res.json(errHandler(500, err));
        }
        // 注册成功
        res.json(errHandler(2000));
      });
    } else {
      //如果doc有数据不存在则表示查询成功，查询成功就意味着数据中已经有同样邮箱的帐号。此时注册失败返回邮箱已存在
      res.json(errHandler(2001));
    }
  })
}


// 3.显示登录页面
controller.showLogin = function (req, res) {
  res.render('login.html');
}


// 4.用户登录
controller.doLogin = function (req, res) {
  /**
   * 思路分析
   * 1.获取post请求参数
   * 2.匹配数据库邮箱
   * 3.匹配数据库密码
   * 4.匹配成功返回
   */

  var body = req.body;
  //  匹配数据库邮箱
  UserModel.find({
    email: body.email
  }, function (err, docs) {
    if (err) {
      //如果操作数据库失败则直接返回服务器报错
      res.json(errHandler(500));
    } else {
      if (docs.length === 0) {
        // 找不到邮箱返回
        res.json(errHandler(1001));
      } else {
        // 匹配密码 docs是一个数组
        if (body.password === docs[0].password) {
          //登陆成功之后，将用户信息写入到cookie
          //一旦配置了cookiesession的中间件，req就有一个属性叫做session，他是一个json对象
          //这里我们可以随便写一个属性来存值，用什么存就用什么取
          console.log(docs[0]);
          req.session.user = docs[0];
          // 匹配成功登录
          res.json(errHandler(1000));
        } else {
          // 密码错误 
          res.json(errHandler(1001));
        }
      }
    }

  })
}

// 5.用户注销
controller.doLogout = function(req,res){
  // 销毁cookie
  req.session.user = null;
  // 刷新页面
  indexController.showIndex(req,res);
}