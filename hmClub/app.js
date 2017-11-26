
//准备工作：导入模块

var express = require('express');
//文件路径模块
var path = require('path');
//文件读写模块
var fs = require('fs');


// 创建服务器
var app = express();

// 2.托管静态资源
// 第一个参数,客户端静态资源请求前缀  第二个参数,要托管的静态资源文件路劲
app.use('/node_modules',express.static(path.join(__dirname,'node_modules')));
app.use('/public',express.static(path.join(__dirname,'public')));

// 3.配置模板引擎(默认会从项目根目录下的views文件查找模板)
// 第一个参数:设置模板文件的后缀名 
// 第二个参数模板引擎渲染的第三方模块
app.engine('html',require('express-art-template'));
// 第一个参数:模板引擎view engine 
// 第二个参数:与上一行代码第一个参数一致也就是模板的后缀
app.set('view engine','html');


// 4.挂载中间件

// 4.1 - 解析post请求的中间件
//导入bodyparser 一旦挂载是我们的req就会有一个属性req.body可以获取到post请求的参数
//细节  body-parse只能解析普通文本数据,如果是文件还需要formidable
var bodyParser = require('body-parser');
//挂载
app.use(bodyParser.urlencoded({extended:false}));



//4.2 挂载网站图标的中间件
var favicon = require('serve-favicon');
// 参数就是网站图标的文件路劲
app.use(favicon(path.join(__dirname,'public','img','hmclub.ico')));


// 5.路由分发

// app.use(路由容器)
app.use(require('./router/index_router.js'));
app.use(require('./router/article_router.js'));
// app.use(require('./router/user_router.js'));

// 快速测试服务器
// app.get('/',function(req,res){
//   fs.readFile('./views/index.html','utf8',function(err,data){
//     if(err){
//       throw err;
//     }
//     res.send(data);
//   })
// })



// 6.监听端口号
app.listen(3000,function(){
  console.log('服务器开启成功');
})