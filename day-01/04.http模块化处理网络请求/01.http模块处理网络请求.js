var http = require('http');

var server = http.createServer();


server.on('request',function(req,res){
  console.log(req.url);
  console.log(req.method);

  // res.write('i love you ');
  // res.end();


  //服务端响应数据给客户端
    // //(1)响应对象写入数据
    // //(2)一定要告诉客户端本次响应结束，否则客户端会一直转圈等待响应结束，知道响应超时

    //上面两个步骤可以简写成一行代码
    res.end('i love you');
})

//4.监听端口号

server.listen(3000,function(err){
  console.log('成功');
})


