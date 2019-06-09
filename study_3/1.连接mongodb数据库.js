

//node 操作mongodb数据库

/*
    1.  安装mongodb数据库
        cnpm i mongodb --save

    2.  引入mongodb下面的MongoClient
        var MongoClient = require("mongodb").MongoClient

    3.  定义数据库连接的地址  以及配置数据库
        koa数据库的名称
        var url = 'mongodb://localhost:27017/';
        var dbName = 'Koa';

    4.node连接数据库
        MongoClient.connect(url, function(err, client){
            const db = client.db(dbName)    数据库db对象
        })
    
    5.操作数据库
        db.user.insert
        MongoClient.connect(url, function(err, db){
            db.collection("user").insertOne({"name":"张三"}, function(err, result){
                db.close()
            })
        })

*/
console.time("start")

var MongoClient = require("mongodb").MongoClient;

var url = 'mongodb://localhost:27017/';

var dbName = 'koa';

//连接数据库
// MongoClient.connect(url, (err, client) => {
//     if(err){
//         console.log(err);
//         return;
//     }
//     const db = client.db(dbName)    //数据库db对象
//     db.collection("user").insertOne({"username":"赵六","age":33,"sex":"男","status":"0"}, (err,result) =>{
//         if(!err){
//             console.log("增加数据成功");
//             client.close()

//             console.timeEnd("start")
//         }
//     })
// })


//连接数据库
MongoClient.connect(url, (err, client) => {
    if(err){
        console.log(err);
        return;
    }
    const db = client.db(dbName)    //数据库db对象
    
    //查询数据
    var result = db.collection("user").find({});

    result.toArray((err, docs) => {
        console.log(docs)
        console.timeEnd("start")
    })
})