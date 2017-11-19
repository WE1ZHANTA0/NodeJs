//1.导入http模块
var http = require('http');

//2.创建服务器
var server = http.createServer();

//3.注册监听客户端请求的时间
server.on('request',function(req,res){
    console.log(req.url);//url路径指的是127.0.0.1:3000之后的内容
    console.log(req.method);

    //响应头的作用：1.客户端告诉浏览器响应给你的是什么数据  2.浏览器显示数据是按照响应头设置的格式来的

    if(req.url === '/'){
      res.writeHead(200,{
        'Content-Type':'text/plain;charset=utf-8'//text/plain普通的文本        
      })
      res.end('就是看到飞机撒开了房间');
    }else if(req.url === '/home'){
      res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8'//text/html格式的文本
      })
       //如果响应给客户端的是一个html标签的文本，但是设置响应头却是普通文本，此时浏览器就无法解析标签
       res.end('<h1>hello world </h1><h2>hello nodejs</h2>')
    }

   
});

//4.监听端口号

server.listen(3000,function(){
    console.log('启动成功');
})