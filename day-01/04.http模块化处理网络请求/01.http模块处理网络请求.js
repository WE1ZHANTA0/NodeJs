var http = require('http');

var server = http.createServer();


server.on('request',function(err,data){
  console.log(req.url);
  console.log(req.method);

  res.write('i love you ');
  res.end();
})