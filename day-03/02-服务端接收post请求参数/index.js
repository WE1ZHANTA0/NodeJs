//1.导入http模块
var http = require('http');
//读取文件模块
var fs = require('fs');
//路径模块
var path = require('path');

//导入url模块解析url
var url = require('url');

var querystring = require('querystring');


//2.创建服务器
var server = http.createServer();

//3.服务端接收客户端请求
//注册一个监听请求事件
server.on('request', function (req, res) {
    var method = req.method;
    console.log(req.url);
    addRenderFunction(res);

    /**1。获取post数据
      * 由于post请求的数据量很大，服务端并不是一次就可以获取到所有的数据，而是以数据包的请求获取，会发送多次
      （1）给req对象注册一个获取数据的事件
      */
    //1.1 给req对象注册一个获取数据的事件
    /**
     * post请求浏览器会分很多次来发送，至于时多少次取决于数据的大小。如果数据小可以能一次就发送完成
     * 如果数据量很大则会发送多次
     */
    //这个方法会在每一次接收到post数据时会调用，回调函数中的参数就是本次数据块
    //post请求数据需要我们自己来拼接
    var data = '';
    req.on('data', function (chunk) {
        // 默认chunk是一个二进制的数据;
        console.log(chunk);
        // 如果chunk使用字符串拼接的方式叠加,则会自动转换成字符串;
        data += chunk;
    })
    req.on('end', function () {
        console.log('post数据接收完毕：' + data);

        // 2.处理post请求数据

        /**z注意：post请求的数据不能使用url模块来解析，因为url模块parse()方法的参数一个url对象，
         * 而post请求获取的数据是一个字符串
         *  */

        //使用querystring模块解析post请求数据
        /**
         * 参数：url中的查询字符串 也就是键值对
         返回值：对url进行反序列化（将&和=拆分，得到一个对象）对象
         */

         var body = querystring.parse(data);
         console.log(body);
    })


    if(req.url === '/heroAdd' && method==='GET'){
        // 显示界面
        res.render('heroAdd');
    }
    if((req.url.indexOf('/node_modules')===0)||(req.url.indexOf('/public')===0)){
        //访问开放的静态资源（第三方模块 publick文件夹下内容）
        //无需逻辑处理，读取对应路径的资源文件响应返回即可
        fs.readFile(path.join(__dirname,req.url),function(err,data){
            if(err){
                //真实项目，不应该抛出异常，一旦抛出服务器就停止，这里我们应该返回客户端错误原因
                res.end('file not found' + req.url);
            }
            res.end(data);
        })
    }


});

/**
 * 给响应对象res动态添加一个函数
 */

function addRenderFunction(res) {
    //这行代码的本质就是将一个匿名函数赋值给一个对象的属性
    res.render = function (tplname, jsonname) {

        var tplFileName = './' + tplname + '.html';
        var jsonFileName = './' + jsonname + '.json';

        //（1）读取首页html模板
        fs.readFile(tplFileName, 'utf-8', function (err, tpldata) {
            if (err) {
                return res.end('template not found' + tplFileName);
            }
            // res.end(data);
            //console.log(tpldata);
            //(2)读取html模板成功之后，读取数据
            fs.readFile(jsonFileName, 'utf-8', function (err, jsondata) {
                if (err) {
                    // console.log(tplFileName);
                    // console.log(jsonFileName);
                    //如果没有json数据，则直接返回html模板
                    //业务逻辑：有一些html模板不需要模板引擎渲染
                    return res.end(tpldata);
                }
                //(3)使用模板引擎渲染（将json数据渲染到html模板中）
                //文件读取的是一个字符串,而模板引擎方法的参数是对象，所以要把json字符串转成json对象
                var jsonObjc = JSON.parse(jsondata);
                //console.log(jsondata);
                //第一个参数：html字符串 第二个参数是json对象
                //返回值是一个渲染好的html文本
                var htmlStr = template.compile(tpldata)(jsonObjc);
                //(4)响应返回渲染好的html文本
                return res.end(htmlStr);

            })
        });

    }
}

//4.监听端口号
server.listen(3000, function () {
    console.log('服务器启动成功');
});