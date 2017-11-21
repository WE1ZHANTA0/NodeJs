var http = require('http');

var path = require('path');

var formidable = require('formidable');

var renderModule = require('./render.js');


// 创建服务器
var server = http.createServer();


//3.服务端接收客户端请求
//注册一个监听请求事件
server.on('request', function (req, res) {
  var url = req.url;
  var method = req.method;
  console.log(url + ':' + method);

  renderModule(res);

  //设计路由
  if (url === '/' && method === 'GET') {
    //显示首页
    /**思路分析
     *  * （1）读取首页heroList.html模板
     * （2）读取json文件数据
     * （3）模板引擎渲染
     * （4）返回已经渲染了数据的的html文本
     */

    res.render('heroList', 'hero');


  } else if (url === '/heroAdd' && method === 'GET') {
    //显示添加英雄界面
    res.render('heroAdd');
  } else if (url === '/heroAdd' && method === 'POST') {
    //添加英雄到数据库

    /**1.formidable接收post数据
     * 2.将数据存到数据库
     * 3.响应返回保存结果
     */
    /**formidable接收文件数据用法
     * 1.将普通文本数据放入到fileds对象中
     * 2.将文件数据放入到files对象中
     * 3.会默认将文本保存到系统磁盘的临时目录中，文件名时随机的（作用：防止文件名重复）
     * 4.默认情况下 文件的存储路径path属性省略文件拓展名的
     */
    // 1.创建一个解析对象
    var form = new formidable.IncomingForm();
    //1.1 设置文件提交的目录,默认会提交到系统根磁盘临时文件夹，设置之后就会将图片提交到指定的文件目录
    form.uploadDir = './public/images';
    //1.2 设置保留文件拓展名 默认会省略文件拓展名
    form.keepExtensions = true;
    //1.3.开始解析请求
    /**
     * 第一个参数：请求对象
     * 第二个参数：回调函数 解析完成时会调用
     *      * err:解析出错
     *      * fields 普通文本数据对象
     *      * files 文件详细信息
     */
    form.parse(req, function (err, fields, files) {
      // formidable解析完成后,讲普通文本数据放入到fields对象中
      console.log(fields);
      // formidable解析完之后,将文件的数据放入到files对象中 该对象有一属性记录了文件的所有信息(属性就是form表单中input标签的name属性)
      console.log(files);
      //默认情况下文件名是随机的，这里我们可以通过name属性获取该上传文件的真实文件名
      /**修改文件
       * 第一个参数：原始的文件路径
       * 第二个参数： 要修改的文件路径
       * 第三个参数 ：修改完成的回调
       */
      var oldPath = path.join(__dirname, files.icon.path);
      var newPath = path.join(__dirname, form.uploadDir, files.icon.name);
      console.log('oldpath' + oldPath);
      console.log('newPath' + newPath);
      //1.4修改提交的文件名到执行的文件路径
      fs.rename(oldPath, newPath, function (err) {
        if (err) {
          throw err;
        }
        console.log('文件保存成功');
        // 2 将数据对象保存到数据库(json);

        // 2.1读取json文件
        fs.readFile('./hero.json', 'utf-8', function (err, jsondata) {
          if (err) {
            //end方法只能响应字符串和二进制，如果是json对象则需要转成字符串
            //告诉客户端保存出错
            res.end(JSON.stringify({
              err_code: 500,
              err_mesage: err.message
            }));
          }

          // 2.2将读取的json 字符串转成json对象
          var jsonObj = JSON.parse(jsondata);

          // 2.3数组添加英雄对象 heros.push();

          var hero = {};
          // id是数组的长度+1
          hero.id = jsonObj.heros.length + 1;
          hero.name = fields.name;
          hero.gender = fields.gender;
          //由于我们json数据库中icon保存的/public/image/filename.jpg
          hero.icon = path.join(form.uploadDir, files.icon.name);

          jsonObj.heros.push(hero);

          // 2.4 将json对象转成字符串
          //第一个参数：要转的sjon对象  第二个参数：替换函数通常为null 第三个参数：指定缩进
          var jsonStr = JSON.stringify(jsonObj, null, ' ');

          //2.5 将json字符串写入文件
          //第一个参数：文件路径 第二个参数：要写入的数据 第二个写入完成的回掉
          fs.writeFile('./hero.json', jsonStr, function (err) {
            if (err) {
              //告诉客户端保存出错
              res.end(JSON.stringify({
                err_code: 500,
                err_mesage: err.message
              }));
            }

            // 3响应返回的结果
            res.end(JSON.stringify({
              err_code: 0,
              err_mesage: null
            }))


          })


        })
      })
    })


  } else if (url === '/heroInfo' && method === 'GET') {
    //显示英雄详情界面
  } else if (url === '/heroEdit' && method === 'GET') {
    //显示编辑英雄界面
  } else if (url === '/heroEdit' && method === 'POST') {
    //修改英雄
  } else if (url === '/heroDelet' && method === 'GET') {
    //删除英雄
  } else if ((url.indexOf('/node_modules') === 0) || (url.indexOf('/public') === 0)) {
    //访问开放的静态资源（第三方模块 publick文件夹下内容）
    //无需逻辑处理，读取对应路径的资源文件响应返回即可
    fs.readFile(path.join(__dirname, url), function (err, data) {
      if (err) {
        //真实项目，不应该抛出异常，一旦抛出服务器就停止，这里我们应该返回客户端错误原因
        res.end('file not found' + url);
      }

      res.end(data);
    });
  } else {
    //如果客户端请求的错误的路径我们返回404错误
    res.end('404 not found' + url);
  }




})


server.listen(3000, function (err) {
  console.log('成功');
})


// function addRender(res) {
//   res.render = function (tplName, jsonName) {
//     var tplFileName = './views/' + tplName + '.html';
//     var jsonFileName = './' + jsonName + '.json';
//     //  读取html模板
//     fs.readFile(tplFileName, 'utf-8', function (err, tpldata) {
//       if (err) {
//         res.end('template not found' + tplFileName);
//         return;
//       }
//       fs.readFile(jsonFileName, 'utf-8', function (err, jsondata) {
//         if (err) {
//           // res.end('jsondata not found' + jsonFileName);
//           //如果没有json数据，则直接返回html模板
//           //业务逻辑：有一些html模板不需要模板引擎渲染
//           return res.end(tpldata);
//         }
//         //(3)使用模板引擎渲染（将json数据渲染到html模板中）
//         //文件读取的是一个字符串,而模板引擎方法的参数是对象，所以要把json字符串转成json对象
//         var jsonObj = JSON.parse(jsondata);
//         var htmlStr = template.compile(tpldata)(jsonObj);
//         res.end(htmlStr);
//         return;
//       })
//     })
//   }
// }