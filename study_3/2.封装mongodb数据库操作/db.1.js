//db库
var MongoClient = require("mongodb").MongoClient;

var Config = require("./config")


//封装类库

class Db{

    static getInstance(){
        if(!Db.instance){
            Db.instance = new Db();
        }
        return Db.instance
    }

    constructor(){
        this.dbClient = ''; //属性  存放db对象
        this.connect();
    }

    connect(){  //连接数据库
        let _that = this;
        return new Promise( (resolve, reject) => {
            if(!_that.dbClient){
                MongoClient.connect(Config.dbUrl, (err, client) => {
                    if(err){
                        reject(err)
                    }else{
                        _that.dbClient = client.db(Config.dbName);
                        resolve(_that.dbClient)
                    }
                })
            }else{
                resolve(_that.dbClient)
            }
        })
    }

    //查询数据库
    find(collectionName, json){
        return new Promise( (resolve, reject) => {
            this.connect().then((db) => {
                var result = db.collection(collectionName).find(json);
                result.toArray(function (err, docs) {
                    if(err){
                        reject(err)
                        return;
                    }else{
                        resolve(docs)
                    }
                })
            })
        })
    }
}

var myDb  = Db.getInstance()

myDb.find("user", {}).then((data) => {
    console.log(data)
})
