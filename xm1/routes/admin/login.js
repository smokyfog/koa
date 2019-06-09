const router = require("koa-router")();
const tools = require("../../model/tools")
const DB = require("../../model/db")


router.get("/",async (ctx) => {
    await ctx.render("admin/login")
})


router.post("/doLogin",async (ctx) => {
    //首先去数据库匹配
    var username = ctx.request.body.username
    var password = ctx.request.body.password
    console.log(tools.md5(password));
    
    //  1.验证用户名和密码是否合法
    //  2.从数据库匹配
    //  3.成功以后把用户信息写入session
    var data = await DB.find("admin", {"username":username,"password":tools.md5(password)})
    if(data.length > 0){
        ctx.session.userinfo = data[0];
        ctx.redirect(ctx.state.__HOST__+"/admin")
    }else{
        
    }
})

module.exports = router.routes();