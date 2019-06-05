//静态资源中间件
//1.    cnpm i koa-static --save
//2.    const static = require("koa-static")
//3.    app.use(static("static/"))

var Koa = require("koa");
var router = require("koa-router")(); 
var views = require("koa-views");
var common = require("./module/comm")
var bodyParser = require("koa-bodyparser");
var static = require("koa-static");

var app = new Koa();

app.use(views("views", {
    extension:'ejs' //应用模板引擎
}))
app.use(static("./static"))


//配置bodyParser中间件
app.use(bodyParser());

router.get("/", async (ctx) => {
    await ctx.render("index")
})

router.get("/news", async (ctx) => {
    ctx.body = "新闻页面"
})


router.post("/doAdd", async (ctx) => {
    //获取表单提交的数据
    //1.  原生获取写法
    // var str = "";
    // req.on("data", (data) => {
    //     str += data
    // })
    // req.on("end", function(data){
    //     console.log(str)
    // })
    // var data = await common.getPostData(ctx);
    // ctx.body = data;

    ctx.body = ctx.request.body;

})


app
  .use(router.routes())             //启动路由
  .use(router.allowedMethods());    //可选     可自动设置响应头

app.listen(3000,()=>{
    console.log("listen 3000 ...")
})