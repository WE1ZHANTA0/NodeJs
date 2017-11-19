var http = require('http');

var server = http.createServer();

server.on('request',function(req,res){
  console.log(req.url);
  console.log(req.method);

  if(req.url === '/'){
    res.end('welcome to index');
  }else if(req.url === '/home'){
    res.end('the home');
  }else if(req.url==='/out'){
    res.end('找不到');
  }
})


server.listen(3000,function(){
  console.log('成功');
})