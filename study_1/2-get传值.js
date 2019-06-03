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
router.get("/newscontent", async (ctx) => {
    
    //从ctx种读取get传值
    console.log(ctx.query)          //常用
    console.log(ctx.querystring)
    //从ctx中的request里面获取
    console.log(ctx.url)
    console.log(ctx.request.url)
    console.log(ctx.request.query)
    

    ctx.body = "新闻详情"
})


app
  .use(router.routes())             //启动路由
  .use(router.allowedMethods());    //可选     可自动设置响应头

app.listen(3000,()=>{
    console.log("listen 3000 ...")
})