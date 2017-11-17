var fs = require('fs')


// fs.readFile('./a.txt','utf-8',function(err,data){
//   if(err){
//     throw err;
//   }
//   console.log(data);
// })

fs.readFile('./test.html','utf8',function(err,data){
  if(err){
    throw err;
  }
  console.log(data);
})