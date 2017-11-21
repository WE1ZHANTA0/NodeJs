//1.导入http模块
var http = require('http');
//读取文件模块
var fs = require('fs');
//路径模块
var path = require('path');

//导入url模块解析url
var url = require('url');

//导入post文件数据解析第三方模块
var formidable = require('formidable');

var querystring = require('querystring');


//2.创建服务器
var server = http.createServer();

//3.服务端接收客户端请求
//注册一个监听请求事件
server.on('request', function (req, res) {

    var method = req.method;
    addRenderFunction(res);

    if (req.url === '/heroAdd' && method === 'GET') {
        //显示添加英雄界面
        res.render('heroAdd');
    }
    if (req.url === '/heroAdd' && method === 'POST') {
        /**
         * formidable接受文件数据用法
         * 1.将普通文本数据放到fileds对象中
         * 2.将文件数据放到files对象中
         * 3.会莫仍将文本保存到系统磁盘的临时目录中,文件名随机
         * 4.默认情况下 文件的存储路径path属性省略文件拓展名
         */

        //  1.创建一个解析对象
        var form = new formidable.IncomingForm();
        //1.1 设置文件提交的目录,默认会提交到系统根磁盘临时文件夹，设置之后就会将图片提交到指定的文件目录
        form.uploadDir = './images';
        //1.2 设置保留文件拓展名  默认会省略文件拓展名
        form.keepExtensions = true;
        //2.开始解析请求
        /**
         * 第一个参数：请求对象
         * 第二个参数：回调函数 解析完成时会调用
         *      * err:解析出错
         *      * fields 普通文本数据对象
         *      * files 文件详细信息
         */
        form.parse(req, function (err, fields, files) {
            //formidable解析完成之后，将普通的文本数据放入到fields对象中
            //  console.log(fields);
            //formidable解析完成之后，将文件数据放入到files对象中  该对象有一属性记录了文件的所有信息（属性就是form表单中input标签的name属性）
            // console.log(fiels);
            console.log(files.icon.path);
            //默认情况下文件名是随机的，这里我们可以通过name属性获取该上传文件的真实文件名
            /**修改文件
             * 第一个参数：原始的文件路径
             * 第二个参数： 要修改的文件路径
             * 第三个参数 ：修改完成的回调
             */
            var oldPath = path.join(__dirname, files.icon.path);
            var newPath = path.join(__dirname, form.uploadDir, files.icon.name);
            fs.rename(oldPath, newPath, function (err) {
                if (err) {
                    throw err;
                }
                console.log('文件保存成功');
            })
        });
    }
    if ((req.url.indexOf('/node_modules') === 0) || (req.url.indexOf('/public') === 0)) {
        //访问开放的静态资源（第三方模块 publick文件夹下内容）
        //无需逻辑处理，读取对应路径的资源文件响应返回即可
        fs.readFile(path.join(__dirname, req.url), function (err, data) {
            if (err) {
                //真实项目，不应该抛出异常，一旦抛出服务器就停止，这里我们应该返回客户端错误原因
                res.end('file not found' + req.url);
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