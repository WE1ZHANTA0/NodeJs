//1.每一个js文件（模块）都是一个私有的作用域,文件中定义的变量的作用域就是这个文件
//2如果想让外部去访问我这个文件的变量，我们则需要将模块导出

var name = 'name';
var fn = function(){
  console.log('11111111');
}


module.exports.a = '111';
module.exports.name = name;
module.exports.fn = fn;

return module.exports;