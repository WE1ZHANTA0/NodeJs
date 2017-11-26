var routers = module.exports;

var url = require('url');

var renderModel = require('./render.js');

var controller = require('./controller.js');

routers.router = function (req, res) {
  //如果请求路径有中文，浏览器会自动进行URI编码，这里需要解码才可以得到中文
  // var url = decodeURI(req.url);
  //1.使用url模块解析请求路径（url模块会自动帮我们解码中文）

  var urlObj = url.parse(req.url, true);
  // console.dir(urlObj);
  // console.log('请求路径' + urlObj.pathname);
  //将解析到的参数对象复制给req的query，下一次使用时就可以直接使用req.query
  //这样写的目的时提交代码的辨识度
  req.query = urlObj.query;
  //2.请求的路径
  var pathname = urlObj.pathname;

  var method = req.method;

  renderModel.render(res);


  // 设计路由
  if (pathname === '/' && method === 'GET') {
    // 显示主页
    // console.log('hehehe');
    controller.showHeroList(req, res);
  } else if (pathname === '/heroAdd' && method === 'GET') {
    // 显示英雄添加页
    controller.showHeroAdd(req, res);
  } else if (pathname === '/heroAdd' && method === 'POST') {
    // 添加英雄导到数据库
    controller.doHeroAdd(req, res);
  } else if (pathname === '/heroInfo' && method === 'GET') {
    // 显示英雄详情页
    controller.showHeroInfo(req, res);
  } else if (pathname === '/heroEdit' && method === 'GET') {
    // 显示编辑英雄界面
  } else if (pathname === '/heroEdit' && method === 'POST') {
    // 修改英雄
  } else if (pathname === '/heroDelete' && method === 'GET') {
    // 删除英雄
  } else if ((pathname.indexOf('/node_modules') === 0) || (pathname.indexOf('/public') === 0)) {

    controller.showStatic(req, res);

  } else {
    res.end('404 not found' + url);
  }


}