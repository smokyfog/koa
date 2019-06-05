/*
    1.  安装    
            npm i --save art-template
            npm i --save koa-art-template
    2.  引入
            const render = require("koa-art-template")
    3.  配置
            render(app, {
                root: path.join(__dirname, 'view'),
                extname: '.html',
                debug: process.env.NODE_ENV !== 'production'
            });

*/

const path = require("path")
var Koa = require("koa");
var router = require("koa-router")();
const render = require("koa-art-template")

var app = new Koa();

render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});




router.get("/", async (ctx) => {
    let list = {
        "name" : "张三"
    }
    await ctx.render("index", list)
})

router.get("/news", async (ctx) => {
    let list = {
        name : "李四",
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