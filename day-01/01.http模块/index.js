var http = require('http');
var server = http.createServer();

server.on('request',function(req,res){
  console.log('req'+req.url);
  console.log('res'+req.method);
})

server.listen(3000,function(err){
  if(err){
    throw err;
  }

  console.log('服务器开启成功');
})