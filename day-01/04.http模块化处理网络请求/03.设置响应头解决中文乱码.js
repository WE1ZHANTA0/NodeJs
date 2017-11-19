var http = require('http');

var server = http.createServer();

server.on('request',function(req,res){
  console.log(req.url);
  console.log(req.method);



  /**默认情况下，响应对象是没有响应头的，所以如果响应的是中文，则浏览器无法识别，，显示乱码
     * 可以通过给res响应对象设置一个响应头来解决中文乱码的问题
     */
    /**
     * 第一个参数：状态码 200表示响应成功
     */
    //响应头的作用：服务端告诉浏览器响应的数据是什么类型

  res.writeHead(200,{
    'Content-Type':'text/plain;charset=utf-8'//text/plain普通的文本
  })

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