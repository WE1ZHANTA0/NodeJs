/**
 * nodejs中有三种模块
 * 模块的好处：1.代码便于维护  2.让开发变得简单（需要什么功能导入什么模块）
 */

 //1.核心模块（原生模块，内置模块） Nodejs官方提供的模块：
 //http://nodejs.cn/api/http.html#http_http_createserver_requestlistener

 var fs = require('fs');

 //2.文件模块
 /**nodejs中任何一个.js文件、.json文件、.node都是一个模块
  * 由来：文件作用域
  导入：文件路径
  */


  var mokuai = require('./mokuai');
  console.log(mokuai);



  //3.第三方模块   npm stall moment


  var moment = require('./node_modules/moment');

  //设置国际化

  moment.locale('zh-cn');
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));

  ; // 十一月 16日 2017, 6:00:22 晚上
  // moment().format('dddd');                    // 星期四
  // moment().format("MMM Do YY");               // 11月 16日 17
  // moment().format('YYYY [escaped] YYYY');     // 2017 escaped 2017
  // moment().format();  
  