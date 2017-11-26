// var querystring = require('querystring');



/**注意：这里不能直接导入articleModel模块，因为该模块的内部只是定义的文章的数据结构，并没有初始化mongoose
 * 这里要想使用articleModel拥有数据库增删改查操作，首先mongoose必须要连接mongodb数据库，而mongoose连接操作是由
 * index_model负责的
 * 结论：应该通过导入index_model来获取articleModel对象
 */

var articleModel = require('../models/index_model.js').Article;

var controller = module.exports;

// 显示添加文章页面

controller.showArticleAdd = function (req, res) {
  //默认express加载的是views文件夹下模板文件，如果该模板文件在views文件夹下的子文件夹中，则路径需要加上子文件夹（会自动帮我们join）
  console.log(2222222);
  res.render('article/articleAdd.html');
}

// 添加文章到数据库
controller.doArticleAdd = function (req, res) {
  /**思路分析
   * 1.接收post请求的参数
   * 2.将文章数据添加到数据库
   * 3.响应返回添加结果
   * 
   */

  //获取请求参数
  var body = req.body;

  //添加到数据库
  //创建entity实体
  var article = new articleModel({
    title: body.title,
    content: body.content,
    articleType: body.articleType
  })

  // console.log(article);

  //插入到数据库
  articleModel.create(article, function (err, docs) {
    //失败响应返回
    if (err) {
      //    res.end(JSON.stringify({
      //        err_code : 500,
      //        err_message : err.message
      //    }));
      //express有一个自带的可以直接响应json对象的方法，它在内部帮我们做了转换
      res.json({
        err_code: 500,
        err_message: err.message
      });
    }
    res.json({
      err_code:0,
      err_message:null
    })
  })


}

// 显示文章详情页

// 显示文章编辑页面

// 编辑文章