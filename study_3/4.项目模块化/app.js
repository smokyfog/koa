const path = require("path")
const Koa = require("koa");
const router = require("koa-router")();
const render = require("koa-art-template")
const bodyParser = require("Koa-bodyparser")


//引入子路由
var admin = require("./routes/admin")
var api = require("./routes/api")
var index = require("./routes/index")

var app = new Koa();


app.use(bodyParser())

//配置art-template摸板引擎
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

//首页  注意前台和后台的匹配路由的写法不一样
router.use("/",index)


/*  admin    配置子路由  层级路由*/  
router.use("/admin", admin.routes());


//新闻列表的api
// router.use("/api", api.routes());
router.use("/api", api);    //在模块中暴露路由并且启动路由

//启动路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(8000,() => {
    console.log("listen 8000 ...")
})