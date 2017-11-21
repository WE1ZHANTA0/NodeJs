//1.导入http模块
var http = require('http');
//读取文件模块
var fs = require('fs');
//路径模块
var path = require('path');

//导入url模块解析url
var url = require('url');


//2.创建服务器
var server = http.createServer();

//3.服务端接收客户端请求
//注册一个监听请求事件
server.on('request', function (req, res) {
    //如果url中包含中文，则浏览器会自动进行URI编码encode（iso8859）
    console.log(req.url);
    //如果想要获取url中的中文，则需要URI解码decode
    console.log(decodeURI(req.url));
    var method = req.method;

    //1.使用url模块解析url路径，非常非常的简单只有一个API
    /**解析url路径的方法
     * 第一个参数：要解析的url
     * 第二个参数：parseQueryString boolean型 如果为true解析的是一个对象 如果为false是一个字符串
     * 得到的是一个对象，里面包含了url路径中所有的信息
     * Url {
  protocol: null,协议名 这里因为我们省略了http://127.0.0.1:3000
  slashes: null,
  auth: null,
  host: null,127.0.0.1:3000
  port: null,3000
  hostname: null,127.0.0.1
  hash: null,#资源定位符
  search: '',
  query: {},  get请求的参数，这里是对象
  pathname: '/get',路径名，相当于无参数的req.url
  path: '/get', 路径=参数
  href: '/get' }
     */

    var urlObj = url.parse(req.url, true);
    //得到的是一个url的完整对象
    // console.log(urlObjc);
    //get请求的参数放在该对象的query属性中
    /**
     * 这行代码的作用：给请求对象req添加了一个query属性，这个属性的值就是解析之后的参数对象
     * 这种写法的好处就是提高代码的易读性
     */
    res.query = urlObj.query;

    var pathName = urlObj.pathname;

    //使用url模块解析路径之后 req就有了一个对象query，get请求的参数就在该对象中
    // console.log(req.query);
    //给res对象添加一个渲染函数的方法，方法的参数就是相应对象
    //响应对象res的作用域是在server.on（）方法中，外部无法获取，所以这里需要传参
    addRenderFunction(res);
    if (pathName === '/heroAdd' && method === 'GET') {
        res.render('heroAdd');
    }
    if ((pathName.indexOf('/node_modules') === 0) || (pathName.indexOf('/public') === 0)) {
        //访问开放的静态资源（第三方模块 publick文件夹下内容）
        //无需逻辑处理，读取对应路径的资源文件响应返回即可
        fs.readFile(path.join(__dirname, pathName), function (err, data) {
            if (err) {
                //真实项目，不应该抛出异常，一旦抛出服务器就停止，这里我们应该返回客户端错误原因
                res.end('file not found' + pathName);
            }
            res.end(data);
        });
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