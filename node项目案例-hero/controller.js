//控制器：负责控制服务端的业务逻辑

var path = require('path');

var fs = require('fs');

var formidable = require('formidable');

var model = require('./model.js');

var controller = module.exports;


//显示首页
controller.showHeroList = function (req, res) {

  /**思路分析
   *  * （1）读取首页heroList.html模板
   * （2）读取json文件数据
   * （3）模板引擎渲染
   * （4）返回已经渲染了数据的的html文本
   */

  res.render('heroList', 'hero');
}

//显示添加英雄界面
controller.showHeroAdd = function (req, res) {

  res.render('heroAdd');
}

//添加英雄到数据库
controller.doHeroAdd = function (req, res) {


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


      // 2.3数组添加英雄对象 heros.push();

      var hero = {};
      // id是数组的长度+1
      hero.name = fields.name;
      hero.gender = fields.gender;
      //由于我们json数据库中icon保存的/public/image/filename.jpg
      hero.icon = path.join(form.uploadDir, files.icon.name);

      model.addHero(hero,function(err){
        if(err){
          res.end(JSON.stringify({
            err_code:500,
            err_message:err.message
          }));
        }
        // 响应返回客户端添加成功
        res.end(JSON.stringify({
          err_code:0,
          err_message:null
        }))
      })

     
    })
  })
}


//访问开放的静态资源
controller.showStatic = function(req,res){
  var url = req.url;
  var method = req.method;
  //访问开放的静态资源（第三方模块 publick文件夹下内容）
    //无需逻辑处理，读取对应路径的资源文件响应返回即可
    fs.readFile(path.join(__dirname, url), function (err, data) {
      if (err) {
        //真实项目，不应该抛出异常，一旦抛出服务器就停止，这里我们应该返回客户端错误原因
        res.end('file not found' + url);
      }

      res.end(data);
    });
}