// var querystring = require('querystring');



/**注意：这里不能直接导入articleModel模块，因为该模块的内部只是定义的文章的数据结构，并没有初始化mongoose
 * 这里要想使用articleModel拥有数据库增删改查操作，首先mongoose必须要连接mongodb数据库，而mongoose连接操作是由
 * index_model负责的
 * 结论：应该通过导入index_model来获取articleModel对象
 */

var articleModel = require('../models/index_model.js').Article;

var controller = module.exports;

var errHandler = require('../errHandle.js');

// 显示添加文章页面

controller.showArticleAdd = function (req, res) {
  //默认express加载的是views文件夹下模板文件，如果该模板文件在views文件夹下的子文件夹中，则路径需要加上子文件夹（会自动帮我们join）
  // console.log(2222222);
  
  res.render('article/articleAdd.html',{
    user:req.session.user
  });
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
    articleType: body.articleType,
    user_id:body.user_id
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
      err_code: 0,
      err_message: null
    })
  })


}

// 显示文章详情页
controller.showArticleInfo = function (req, res) {

  /** 
   * 思路分析:
   * 1.获取地址栏信息
   * 2.查询数据库
   * 3.文章查看数+1
   * 4.保存导数据库
   * 5.响应返回渲染模板
   */

  var query = req.query;
  // console.log(query);

  /**mongoose的id属性有一个下划线_id,如果只是读取它的值，下划线可以省略`id`,如果是改变他的值下划线不能省略`_id`
   */
  articleModel.findById(query.id, function (err, docs) {
    if (err) {
      res.json(errHandler(500, err));
    }


    // console.log(docs);
    // 查看文章数+1
    docs.visits += 1;
    //4.保存到数据库，更新数据库
    /**通常我们更新数据库使用update，这里为什么用create也可以主要是因为我的id是一致的
     * 如果我们保存到数据库使用create（插入数据），如果你插入的数据的id与数据库中已存在的数据id一致则会覆盖
     */
    articleModel.create(docs,function(err){
      if(err){
        res.json(errHandler(500, err));
      }
      var user = req.session.user;
      console.log(docs);
      console.log(user);
      // 响应返回渲染模板
      res.render('article/articleInfo.html',{
        article:docs,
        user:user
      });
    })
  })
}

// 显示文章编辑页面
controller.showArticleEdit = function(req,res){
  /**
   * 思路分析
   * 1.获取地址栏信息
   * 2.匹配数据库
   * 3.渲染页面
   */
  var query = req.query;

  // 查询数据库
  articleModel.findById(query.id,function(err,docs){
    if(err){
      res.json(errHandler(500,err));
    }
    // 响应返回渲染模板
    res.render('article/articleEdit.html',{
      article:docs
    })
  })
}

// 编辑文章

controller.doArticleEdit = function(req,res){
  /**
   * 思路分析
   * 1.获取post传递的参数
   * 2.根据id匹配数据库并修改
   * 3.响应返回结果
   */

   var body = req.body;

  //  console.log(body);

  // 更新到数据库
  articleModel.update({
    _id:body.id
  },body,function(err){
    if(err){
      res.json(errHandler(500,err));
    }
    res.json(errHandler(0));
  })

}











