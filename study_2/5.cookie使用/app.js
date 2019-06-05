
const path = require("path")
var Koa = require("koa");
var router = require("koa-router")();
const render = require("koa-art-template")

var app = new Koa();

render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production',
    // httpOnly : true,    //表示只有服务端使用  false 为服务器和本地都可以使用
});


router.get("/", async (ctx) => {
    //汉字cookie
    new Buffer("张三").toString("base64")   //转换为base64字符
    new Buffer("5byg5LiJ","base64").toString()  //反转回
    ctx.cookies.set("userinfo","zhangsan",{
        maxAge:60*1000*60,
        // path: "/news"   //配置可以访问的页面
        domain:""           //默认所有域名可用

    })
    let list = {
        "name" : "张三"
    }
    await ctx.render("index", list)
})

router.get("/shop", async(ctx) => {
    var userinfo = ctx.cookies.get("userinfo")
    ctx.body = `这是一个cookie${userinfo}`
})

router.get("/news", async (ctx) => {
    var userinfo = ctx.cookies.get("userinfo")
    let list = {
        name : userinfo,
        html : '<button>按钮</button>',
        flag : false,
        num : 99,
        data : ["111","222","333"]
    }
    await ctx.render("news",list)
})



app
  .use(router.routes())             //启动路由
  .use(router.allowedMethods());    //可选     可自动设置响应头

app.listen(3000,()=>{
    console.log("listen 3000 ...")
})