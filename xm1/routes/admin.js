var router = require("koa-router")();


var login = require("./admin/login")
var user = require("./admin/user")

//配置中间件 获取url地址
router.use( async (ctx, next) => {
    ctx.state.__HOST__ ='http://'+ctx.request.header.host

    //权限判断
    if(ctx.session.userinfo) {
        await next()
    }else{
        if(ctx.url == "/admin/login" || ctx.url == "/admin/login/doLogin"){
            //没有登陆的话
            await next()
        }else{
            ctx.redirect("/admin/login")
        }
    }
} )

router.get("/",async (ctx) => {
    ctx.render("admin/user/index")
})

router.use("/login",login)
router.use("/user",user)

module.exports = router.routes();