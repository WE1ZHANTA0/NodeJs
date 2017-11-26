var indexModel = require('../models/index_model.js');

// 导入moment模块
var moment = require('moment');
// moment模块默认是英文  需要设置成国际化
moment.locale('zh-cn');


var controller = module.exports;

// 1.显示首页

controller.showIndex = function (req, res) {

  //配置模板引擎之后，所有的res对象都有一个render函数
  //第一个参数：模板文件名（views文件夹下） 第二个参数：要渲染的json对象，如果不传则直接响应返回模板文本

  /**思路分析
   * 1.读取数据库所有数据
   * 2. 模板引擎渲染
   * 3.响应返回渲染好的html文本
   */

  //  1.读取数据库所有数据
    indexModel.Article.find(function(err,docs){
      if(err){
        res.json({
          err_code:500,
          err_message:err.message
        })
      } 
      // console.log(docs);
      // 2.3
      // 由于数据库默认是utc时间,所以这里不能直接渲染,需要将时间转换之后再渲染
      docs.forEach(function(item){
        // getTime()函数的作用是将一个时间格式的字符串转换成时间戳,单位是毫秒以1970年1月1日0点为准
        // console.log(item.updatedAt.getTime());
        // 时间格式转换
        // 这里相当于动态的给数据中的对象添加一个时间的属性,该属性只用于模板引擎渲染显示
        item.localTime = moment(item.updatedAt.getTime()).startOf('second').fromNow();
      })
      res.render('index.html',{
        articles:docs //key=value key:模板语法中的占位对象

      })
    })

}



// 2.搜素文章

controller.doIndexSearch = function (req, res) {

}


// 3.文章分页
controller.doIndexPage = function (req, res) {

}