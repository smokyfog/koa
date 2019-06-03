
exports.getPostData = async function getPostData(ctx){
    //获取数据   异步
    return new Promise(function(resolve, reject){
        let str = "";
        try{
            ctx.req.on("data", function(chunck){
                str += chunck
            })
    
            ctx.req.on("end", function(chunck){
                resolve(str)
            })
        }catch(err){
            reject(err)
        }
        
    })
    
}