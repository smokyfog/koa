//db库
var MongoClient = require("mongodb").MongoClient;

var Config = require("./config")


var ObjectID = require("mongodb").ObjectID;

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
    //更新数据
    update(collectionName, json1, json2){
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).updateOne(json1, {
                    $set:json2
                }, (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result)
                    }
                })
            })
        })
    }
    //插入数据
    insert(collectionName, json){
        return new Promise( (resolve, reject) => {
            this.connect().then( (db) => {
                db.collection(collectionName).insertOne(json, (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result)
                    }
                })
            })
        })
    }

    //删除数据
    remove(collectionName, json){
        return new Promise( (resolve, reject) => {
            this.connect().then( (db) => {
                db.collection(collectionName).removeOne(json, (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result)
                    }
                })
            })
        })
    }

    //根据_id查询
    getObjectID(id){
        return new ObjectID(id)
    }



}



module.exports = Db.getInstance();