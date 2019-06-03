const Koa = require("koa");
const router = require("koa-router")();
 
const app = new Koa();

router.get("/", (ctx, next)=>{

    ctx.body = "首页";      //返回数据   相当于原生种  res.writeHead()  res.end()

}).get("/news", async (ctx)=>{

    ctx.body = "这是一个新闻页面"
    
})

app
  .use(router.routes())             //启动路由
  .use(router.allowedMethods());    //可选     可自动设置响应头

app.listen(3000,()=>{
    console.log("listen 3000 ...")
})