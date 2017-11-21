
var fs = require('fs');
var template = require('art-template');

var render = module.exports;

render = function (res) {
  //这行代码的本质就是将一个匿名函数赋值给一个对象的属性
  res.render = function (tplName, jsonName) {
    var tplFileName = './views/' + tplName + '.html';
    var jsonFileName = './' + jsonName + '.json';
    //  读取html模板
    fs.readFile(tplFileName, 'utf-8', function (err, tpldata) {
      if (err) {
        res.end('template not found' + tplFileName);
        return;
      }
      fs.readFile(jsonFileName, 'utf-8', function (err, jsondata) {
        if (err) {
          // res.end('jsondata not found' + jsonFileName);
          //如果没有json数据，则直接返回html模板
          //业务逻辑：有一些html模板不需要模板引擎渲染
          return res.end(tpldata);
        }
        //(3)使用模板引擎渲染（将json数据渲染到html模板中）
        //文件读取的是一个字符串,而模板引擎方法的参数是对象，所以要把json字符串转成json对象
        var jsonObj = JSON.parse(jsondata);
        var htmlStr = template.compile(tpldata)(jsonObj);
        res.end(htmlStr);
        return;
      })
    })
  }
}