var fs = require('fs');





var model = module.exports;

var modelPath = './hero.json';



function getAllData(callback) {
  // 读取文件
  fs.readFile(modelPath, 'utf-8', function (err, data) {
    if (err) {
      // console.log(err);
      callback(err, null);
    }
    // 将json 字符串转成json对象

    var jsonObj = JSON.parse(data);
    callback(null, jsonObj);
  })
}


model.addHero = function (hero, callback) {
  //1.读取所有的英雄数据
  getAllData(function (err, heroData) {
    if (err) {
      callback(err);
    }
    // console.log(heroData);
    //3.将英雄添加到数组
    hero.id = heroData.heros.length + 1;
    heroData.heros.push(hero);
    // 保存英雄
    saveHero(heroData, function (err) {
      if (err) {
        callback(err);
      }
      callback(null);
    })
  })
}


// 保存英雄
function saveHero(heroData, callback) {
  // 将对象转成字符串
  var jsonStr = JSON.stringify(heroData);
  // 写入文件
  fs.writeFile(modelPath, jsonStr, function (err) {
    callback(err);
  })
}


// 查询英雄
model.fetchHeroById = function (id, callback) {
  //获取到的参数id是字符串类型，但是json文件中存储的id是int类型，所以需要需要将字符串转为int
  var heroID = parseInt(id);

  // 读取所有英雄的数据
  getAllData(function (err, data) {
    //1.1 如果读取出错，则直接告诉controller操作失败
    if (err) {
      callback(err);
    }

    // console.log(data);
    //3.便利英雄数组，找出id一致的哪一个对象
    /**
     * forEach:一旦开始，则会从头遍历为尾部，无法终止
     * some：一旦开始，默认会从头遍历到尾部，但是可以通过return true或者false来决定是否需要继续遍历
     *  * return true，跳出循环不再遍历 节省循环性能
     * filletr：过滤循环 指定一个循环条件，通过循环查找满足条件的所有数据  一旦开始遍历无法结束（从头到尾）  
     */

     data.heros.some(function(hero){
        if(heroID === hero.id){
          //  4.查询到的数据
          callback(null,hero);
          // console.log(hero);
          //5.为了节省性能，当查询到想要的数据之后就可以结束循环
          return true;
        }
     })

  })
}