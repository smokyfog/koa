const path = require("path")
const Koa = require("koa");
const router = require("koa-router")();
const render = require("koa-art-template")
const bodyParser = require("koa-bodyparser");
const static = require("koa-static");
const session = require("koa-session")

const app = new Koa();



//配置art-template摸板引擎
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});
//配置session
app.keys = ['some secret hurr'];        //cookie的签名
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 864000,   //过期时间需要设置 [需要修改] 
    autoCommit: true, /** 没有效果*/
    overwrite: true, /**  */
    httpOnly: true, /**  */
    signed: true, /** 签名 */
    rolling: true, /** 每次都更新session过期时间 */
    renew: false, /*   快要到过期是设置session  [需要修改] */
  };
app.use(session(CONFIG, app));

//配置bodyParser中间件
app.use(bodyParser());
app.use(static(__dirname + '/public'));

//引入模块
var index = require("./routes/index");
var api = require("./routes/api");
var admin = require("./routes/admin");



router.use("/admin",admin)
router.use("/api", api)
router.use(index);

app.use(router.routes());
app.use(router.allowedMethods())



app.listen(8000, () => {
    console.log("listen 8000...");
})