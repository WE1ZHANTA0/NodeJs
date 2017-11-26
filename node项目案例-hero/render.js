var fs = require('fs');
var template = require('art-template');
var renders = module.exports;

renders.render = function (res) {
  res.render = function (tplname, jsonname) {
    var tplFileName = './views/' + tplname + '.html';
    var jsonFileName = './' + jsonname + '.json';

    //（1）读取首页html模板
    fs.readFile(tplFileName, 'utf-8', function (err, tpldata) {
      if (err) {
        res.end('template not found' + tplFileName);
        return;
      }
      // console.log(tpldata);

      if (typeof jsonname !== 'string') {
        // console.log(jsonname);
        // 2.1 直接渲染该对象
        var htmlStr = template.compile(tpldata)(jsonname);
        console.log(htmlStr);
        //2.2 响应返回
        res.end(htmlStr);
        //该函数结束
        return;
      }

      //(2)读取html模板成功之后，读取数据
      fs.readFile(jsonFileName, 'utf-8', function (err, jsondata) {
        if (err) {
          res.end(tpldata);
          return;
        }
        //(3)使用模板引擎渲染（将json数据渲染到html模板中）
        //文件读取的是一个字符串,而模板引擎方法的参数是对象，所以要把json字符串转成json对象
        // console.log(jsondata);
        var jsonObj = JSON.parse(jsondata);
        //第一个参数：html字符串 第二个参数是json对象
        //返回值是一个渲染好的html文本
        // console.log(jsonObj);
        var htmlStr = template.compile(tpldata)(jsonObj);
        // console.log(htmlStr);
        //(4)响应返回渲染好的html文本
        res.end(htmlStr);
      })
    })
  }
}