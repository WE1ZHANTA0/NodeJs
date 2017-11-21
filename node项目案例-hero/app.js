var http = require('http');

var router = require('./router.js');


// 创建服务器
var server = http.createServer();


//3.服务端接收客户端请求
//注册一个监听请求事件
server.on('request', function (req, res) {
 
 router.routers(req,res);




})


server.listen(3000, function (err) {
  console.log('成功');
})


// function addRender(res) {
//   res.render = function (tplName, jsonName) {
//     var tplFileName = './views/' + tplName + '.html';
//     var jsonFileName = './' + jsonName + '.json';
//     //  读取html模板
//     fs.readFile(tplFileName, 'utf-8', function (err, tpldata) {
//       if (err) {
//         res.end('template not found' + tplFileName);
//         return;
//       }
//       fs.readFile(jsonFileName, 'utf-8', function (err, jsondata) {
//         if (err) {
//           // res.end('jsondata not found' + jsonFileName);
//           //如果没有json数据，则直接返回html模板
//           //业务逻辑：有一些html模板不需要模板引擎渲染
//           return res.end(tpldata);
//         }
//         //(3)使用模板引擎渲染（将json数据渲染到html模板中）
//         //文件读取的是一个字符串,而模板引擎方法的参数是对象，所以要把json字符串转成json对象
//         var jsonObj = JSON.parse(jsondata);
//         var htmlStr = template.compile(tpldata)(jsonObj);
//         res.end(htmlStr);
//         return;
//       })
//     })
//   }
// }