var http = require('http');
var path = require('path');
var fs = require('fs');
var template = require('art-template');

var server = http.createServer();

server.on('request', function (req, res) {
  var url = req.url;
  console.log(url);
  if (url === '/') {
    fs.readFile('./index.html', function (err, data) {
      if (err) {
        throw err;
      }
      res.end(data);
    })
  }

  if (url.indexOf('/node_modules') === 0) {
    fs.readFile(path.join(__dirname, url), function (err, data) {
      if (err) {
        throw err;
      }
      res.end(data);
    })
  }

  if (url === '/last' || url === '/next') {
    var jsonName = (url === '/last') ? 'zhangsan.json' : 'lisi.json';
    fs.readFile(path.join(__dirname, 'index.html'),'utf-8', function (err, tpldata) {
      if (err) {
        throw err;
      }
      console.log(tpldata);
      fs.readFile(path.join(__dirname, jsonName), 'utf-8', function (err, jsondata) {
        if (err) {
          throw err;
        }
        //3.使用模板引擎渲染
        //render参数是一个对象，读取json文件得到是一个字符串，所以这里需要将字符串转成json对象
        var jsonObjc = JSON.parse(jsondata);

        // // 3.1 将模板源代码编译成函数
        // //方法参数是html模板的数据，得到的是一个渲染函数
        // var render = art_template.compile(tpldata);
        // // 将模板源代码编译成函数并立刻执行
        // //3.2调用渲染函数渲染数据　　参数：模板数据　返回值：渲染好的ｈｔｍｌ文本
        // 　var htmlStr = 　render(jsonObjc);
        // 

        //上面两个步骤可以简写成下面一行代码
        var htmlStr =template.compile(tpldata)(jsonObjc)

        // console.log(htmlStr);
        //4.响应返回给客户端渲染好的html文本
        res.end(htmlStr);
      })

    })
  }


})



server.listen(3000, function (err) {
  console.log('成功');
})