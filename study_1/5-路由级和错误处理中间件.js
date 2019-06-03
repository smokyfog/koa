var Koa = require("koa");
var router = require("koa-router")();

var app = new Koa();

app.use(async (ctx, next) => {
    //匹配路由之前打印当前日期
    console.log(new Date())
    await next()
})

router.get("/", async (ctx) => {
    ctx.body = "首页"
})

//匹配到news路由后，继续匹配下一个路由
router.get("/news", async (ctx, next) => {
    console.log("这是一个新闻页面")
    await next()
})

router.get("/news", async (ctx) => {
    ctx.body = "新闻页面"
})

router.get("/login", async (ctx) => {
    ctx.body = "登陆页面"
})

//获取get传值
router.get("/newscontent/:aid/:cid", async (ctx) => {
    //获取动态路由的传值
    console.log(ctx.params)
    ctx.body = ctx.params.aid + ctx.params.cid
})

//错误处理中间件
app.use(async (ctx, next) => {
    //匹配路由之前打印当前日期
    console.log("这是一个中间件 01")
    await next()
    if(ctx.status == 404){
        ctx.status = 404;
        ctx.body = "这是一个404页面"
    }
})


app
  .use(router.routes())             //启动路由
  .use(router.allowedMethods());    //可选     可自动设置响应头

app.listen(3000,()=>{
    console.log("listen 3000 ...")
})