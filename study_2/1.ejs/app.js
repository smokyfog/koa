//ejs模板引擎的使用
//  1. npm i --save koa-views
//  2. npm i --save ejs
//  3. app.use(views(__dirname, {extension:'ejs'}))
//  4. await ctx.render("index")

//需要在每一个路由的renader里面渲染公共模块



var Koa = require("koa");
var router = require("koa-router")(); 
var views = require("koa-views");

var app = new Koa();


//配置模板引擎中间件
// app.use(views("views", {map: {html:'ejs'}}))     //如果这样配置的话模板后缀名为html

app.use(views("views", {
    extension:'ejs' //应用模板引擎
}))


//写一个中间件来配置公共信息
app.use(async (ctx,next) => {
    ctx.state.userinfo = "张三";
    await next()
})


app.use(async (ctx, next) => {
    //匹配路由之前打印当前日期
    console.log(new Date())
    await next()
})

router.get("/", async (ctx) => {
    await ctx.render("index", {
        title : "你好ejs"
    })
})

//匹配到news路由后，继续匹配下一个路由
router.get("/news", async (ctx, next) => {
    console.log("这是一个新闻页面")
    await next()
})

router.get("/news", async (ctx) => {
    ctx.body = "新闻页面"

    let arr = ['1111','2222','3333']
    let content = '<h2>这是一个h2</h2>'
    let num = 123
    await ctx.render('news', {
        list : arr,
        content:content,
        num
    })
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