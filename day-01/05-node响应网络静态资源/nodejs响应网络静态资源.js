var http = require('http');

var fs = require('fs');

var server = http.createServer();

server.on('request', function (req, res) {
  console.log('请求路径url' + req.url);
  console.log('请求方法url' + req.method);
  var url = req.url;

  //如果请求路径是/a，返回文本文件
  //如果请求路径是/home,返回html文件

  if (url === '/a') {
    res.writeHead(200, {
      'Content-Type': 'text/plain;charset=utf-8'
    })
    fs.readFile('./a.txt', 'utf-8', function (err, data) {
      if (err) {
        throw err;
      }
      console.log(data);
      //2.响应返回
      /**浏览器响应给客户端的数据只能是两种类型  1：字符串  2：二进制 
      */
      res.end(data);
    });
  }
  /**如果返回的是一个html文件，不写响应头浏览器也可以正确的解析，
    这是因为html文件自身已经写明了编码格式*/

  if(url === '/home'){
    fs.readFile('./index.html',function(err,data){
      if(err){
        throw err;
      }
      res.end(data);
    })
  }
})

server.listen(3000,function(err){
  console.log('成功');
})