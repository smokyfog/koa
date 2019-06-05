
const path = require("path")
var Koa = require("koa");
var router = require("koa-router")();
const render = require("koa-art-template")
const session = require('koa-session');

var app = new Koa();

app.keys = ['some secret hurr'];        //cookie的签名
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,   //过期时间需要设置 [需要修改] 
    autoCommit: true, /** 没有效果*/
    overwrite: true, /**  */
    httpOnly: true, /**  */
    signed: true, /** 签名 */
    rolling: false, /** 每次都更新session过期时间 */
    renew: true, /*   快要到过期是设置session  [需要修改] */
  };
app.use(session(CONFIG, app));

render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production',
    // httpOnly : true,    //表示只有服务端使用  false 为服务器和本地都可以使用
});


router.get("/", async (ctx) => {
    ctx.session.user = "张三"
    let list = {
        "name" : "张三"
    }
    await ctx.render("index", list)
})
router.get("/news", async (ctx) => {
    var user = ctx.session.user
    console.log(user)
    let list = {
        "name" : "张三",
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