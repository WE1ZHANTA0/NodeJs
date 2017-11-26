var http = require('http');

var routers = require('./router.js');


var server = http.createServer();

server.on('request',function(req,res){

  routers.router(req,res);


})



server.listen(3000,function(){
  console.log('开启成功');
})