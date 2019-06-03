var Koa = require("koa");
var router = require("koa-router")();

var app = new Koa();

router.get("/", async (ctx) => {
    ctx.body = "首页"
})

router.get("/news", async (ctx) => {
    ctx.body = "新闻页面"
})

//获取get传值
router.get("/newscontent/:aid/:cid", async (ctx) => {
    //获取动态路由的传值
    console.log(ctx.params)
    ctx.body = ctx.params.aid
})


app
  .use(router.routes())             //启动路由
  .use(router.allowedMethods());    //可选     可自动设置响应头

app.listen(3000,()=>{
    console.log("listen 3000 ...")
})