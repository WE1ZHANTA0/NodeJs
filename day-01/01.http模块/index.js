var http = require('http');
var server = http.createServer();



server.on('request',function(req,res){
  console.log('请求路径url'+req.url);
  console.log('请求方法'+req.method);
})

server.listen(3000,function(err){
  console.log('服务器请求成功');
})
