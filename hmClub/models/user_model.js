//用户模型：负责用户数据的数据库增删改查

//1.导入mongoose模块
var mongoose = require('mongoose');

// 创建schema(数据结构);

var userSchema = mongoose.Schema({
  email:{type:String,require:true},
  password:{type:String,require:true},
  nickname:{type:String,require:true},
  // avatar:{type:String,default:'default'}
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);