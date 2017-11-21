var fs = require('fs');

var model = module.exports;

var modelPath = './hero.json';




//1.查询所有数据
/**
 * 
 * @param {*} callback  function(err,hero){} err:错误信息  hero:所有英雄JSON对象
 */
//如果一个模块（js文件）中函数没有导出，则该函数可以理解为是当前模块的私有函数
function getAllData(callback) {
  fs.readFile(modelPath,'utf-8', function (err, jsondata) {
    if (err) {
      callback(err, null);;
    }
    var jsonObj = JSON.parse(jsondata);
    console.log(jsonObj);
    callback(null, jsonObj);
  })
}


// 2.添加英雄
model.addHero = function(hero,callback){
  // 读取所有英雄的数据
  getAllData(function(err,heroData){
    console.log(23423);
    //2.如果读取所有英雄出错
    if(err){
      callback(err);
    }
    // 3.将英雄添加到数组
    hero.id = heroData.heros.length+1;
    heroData.heros.push(hero);
    // 3.保存英雄
    saveHero(heroData,function(err){
      if(err){
        callback(err);
      }
      callback(null);
    })
  })
}


// 3.保存英雄

function saveHero (heroData,callback){
  // 1.将json对象转成字符串
  var jsonStr = JSON.stringify(heroData);
  // 2.写入文件
  fs.writeFile(modelPath,jsonStr,function(err){
    callback(err);
  })
}

