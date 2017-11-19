var http = require('http');
var fs = require('fs');
var path = require('path');


var server = http.createServer();

server.on('request',function(req,res){
  var url = req.url;
  console.log(url);
  if(url==='/'){
    fs.readFile('./index.html',function(err,data){
      if(err){
        throw err;
      }
      res.end(data);
    });
  }
  if(url.indexOf('/node_modules')===0){
    fs.readFile(path.join(__dirname+url),function(err,data){
      if(err){
        throw err;
      }
      res.end(data);
    })
  }

  if(url==='/last' || url==='/next'){
    var jsonName = (url==='/last')?'zhangsan.json':'lisi.json';
    fs.readFile(path.join(__dirname,jsonName),function(err,data){
      if(err){
        throw err;
      }
      res.end(data);
    })
  }



})



server.listen(3000,function(err){
  if(err){
    throw err;
  }
  console.log('成功');
})