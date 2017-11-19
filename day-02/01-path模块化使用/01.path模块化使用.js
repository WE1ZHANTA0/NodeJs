var path = require('path');

//2.获取本文件相对路径
// console.log('./01-path模块使用.js');

//3.获取文件绝对路径  参数是相对路径
//方法的作用就是将一个相对路径变成绝对路径，返回值是一个路径字符串
/**注意：该方法也会受到node执行命令所处路径的影响 */
var abPath = path.resolve('./a/b/c.txt');

// console.log(abPath);

/**注意：该属性不会受到node执行命令所处路径的影响 */
//C:\Users\zxk\Desktop\12期NodeJS\课堂代码\day02\02-path模块使用
console.log('dirName'+__dirname);//获取当前文件所处文件夹的绝对路径
console.log('fileName'+__filename);//获取当前文件的绝对路径

//4.通过文件夹拼接的方式可以获取该文件夹下其他文件的真实绝对路径
console.log(__dirname + '/a.txt');


//path模块中有一个专门的API用于文件的拼接

//将多个参数组合，拼接成一个完整的绝对路径
//他的作用类似于console.log(__dirname + '/a.txt'，唯一不同不同的是会自动帮我们添加路径标识符/
/**注意：1.不同系统下的路径标识符是不一样的，有的系统是'/',有的系统是'\'，join会自动转出当前系统可以识别的路径分隔符
* 2.当我们路径不规范是，join（）方法会自动帮我们规范化
*/

var joinPath = path.join(__dirname,'/a','/b','/c.txt');
console.log(joinPath);


//5.路径的解析

/**
 * parse()方法会将一个完整的绝对路径解析
 * root: 'C:\\', 磁盘根目录
  dir: 'C:\\Users\\zxk\\Desktop\\12期NodeJS\\课堂代码\\day02\\02-path模块使用\\a\\b',//文件所处目录
  base: 'c.txt',//文件相对路径
  ext: '.txt',//文件拓展名
  name: 'c' //文件名
 */

 var parse = path.parse(joinPath);
 console.log(parse);