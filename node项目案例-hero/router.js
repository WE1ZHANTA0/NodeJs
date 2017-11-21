
var path = require('path');

var fs = require('fs');

var controller = require('./controller.js');



var renderModule = require('./render.js');

module.exports.routers = function (req,res) {

  var url = req.url;
  var method = req.method;
  console.log(url + ':' + method);

  renderModule.hander(res);



  //设计路由
  if (url === '/' && method === 'GET') {
   controller.showHeroList(req,res);


  } else if (url === '/heroAdd' && method === 'GET') {
    
    controller.showHeroAdd(req,res);

  } else if (url === '/heroAdd' && method === 'POST') {
    
    controller.doHeroAdd(req,res);

  } else if (url === '/heroInfo' && method === 'GET') {
    //显示英雄详情界面
  } else if (url === '/heroEdit' && method === 'GET') {
    //显示编辑英雄界面
  } else if (url === '/heroEdit' && method === 'POST') {
    //修改英雄
  } else if (url === '/heroDelet' && method === 'GET') {
    //删除英雄
  } else if ((url.indexOf('/node_modules') === 0) || (url.indexOf('/public') === 0)) {
    controller.showStatic(req,res);
  } else {
    //如果客户端请求的错误的路径我们返回404错误
    res.end('404 not found' + url);
  }
}