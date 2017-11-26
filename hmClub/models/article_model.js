//文章数据结构
//负责文章的数据库增删改查

// 1.导入mongoosemok
var mongoose = require('mongoose');

// 2.创建schema(数据库的数据结构是由schema决定的);

var articleSchema = mongoose.Schema({
  title:{type:String,require:true},//文章标题，不能为空
  content:{type:String,require:true},//文章内容，不能为空
  articleType:{type:String,default:'wenda'},//文章类型，默认为问答
  visits:{type:Number,default:0},//文章阅读数，默认为0
  user_id:{type:String,require:true}//user的id 
},{timestamps:true});//mongoose自动管理时间  updateAt  createAt

// 3.导出
/**这里注意：（1）我们这个模块的职责是负责文章的数据库增删改查  （2）在mongoose中schema是没有操作数据库的能力
 * （3）mongoose中操作数据库增删改查是由model负责的  
 * （4）这里我们导出模块应该导出一个model
 * （5）schmea的作用是创建model
 */
module.exports = mongoose.model('Article',articleSchema);