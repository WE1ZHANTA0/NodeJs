//1.导入http模块
var http = require('http');
//读取文件模块
var fs = require('fs');
//路径模块
var path = require('path');

//2.创建服务器
var server = http.createServer();

//3.服务端接收客户端请求
//注册一个监听请求事件
server.on('request',function(req,res){

    var url = req.url;
    var method = req.method;

    //设计路由
    if(url === '/' && method === 'GET'){
        //显示首页
        fs.readFile('./herolist.html',function(err,data){
            if(err){
                throw err;
            }
            res.end(data);
        })
    }else if(url === '/heroList' && method === 'GET'){
        //显示首页
        fs.readFile('./hero.json',function(err,data){
            if(err){
                throw err;
            }
            res.end(data);
        })
    }
    else if(url === '/heroAdd' && method === 'GET'){
        //显示添加英雄界面
    }else if(url === '/heroAdd' && method === 'POST'){
        //添加英雄到数据库
    }else if(url === '/heroInfo' && method === 'GET'){
        //显示英雄详情界面
    }else if(url === '/heroEdit' && method === 'GET'){
        //显示编辑英雄界面
    }else if(url === '/heroEdit' && method === 'POST'){
        //修改英雄
    }else if(url === '/heroDelet' && method === 'GET'){
        //删除英雄
    }else if((url.indexOf('/node_modules')=== 0 ) || (url.indexOf('/public')=== 0 )){
        //访问开放的静态资源（第三方模块 publick文件夹下内容）
        //无需逻辑处理，读取对应路径的资源文件响应返回即可
        fs.readFile(path.join(path.parse(__dirname).dir,url),function(err,data){
            if(err){
                //真实项目，不应该抛出异常，一旦抛出服务器就停止，这里我们应该返回客户端错误原因
                res.end('file not found' + url);
            }

            res.end(data);
        });
    }else{
        //如果客户端请求的错误的路径我们返回404错误
        res.end('404 not found' + url);
    }

});

//4.监听端口号
server.listen(3000,function(){
    console.log('服务器启动成功');
});