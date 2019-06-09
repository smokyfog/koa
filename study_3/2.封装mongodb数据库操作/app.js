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
const DB = require("./db")
const bodyParser = require("Koa-bodyparser")

var app = new Koa();

//配置post提交的中间件

app.use(bodyParser())

render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});



//显示学员信息
router.get("/", async (ctx) => {

    var result = await DB.find("user",{})

    await ctx.render("index", {
        list : result
    })
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

//增加学员
router.get("/add", async (ctx) => {
    ctx.render("add")
})
//执行增加学员的操作
router.post("/doAdd", async (ctx) => {
    //获取表单提交的数据
    let data = await DB.insert("user",{...ctx.request.body,"status":"2"})
    try{
        if(data.result.ok){
            ctx.redirect("/")
        }
    }catch(err){
        comments.log(err);
        ctx.redirect("/add")
    }
})

//编辑学员
router.get("/edit", async (ctx) => {
    //获取用户信息
    let id =JSON.parse(ctx.query.id) ;
    let data = await DB.find("user", {"_id": DB.getObjectID(id) })
    await ctx.render("edit", {
        list:data[0]
    })
})

//编辑操作
router.post("/doEdit",async (ctx) => {
    var query = ctx.request.body;
    console.log(query)
    let data = await DB.update('user', {"_id":DB.getObjectID(query.id)}, {
        "username":query.username,
        "age":query.age,
        "sex":query.sex
    })
    ctx.redirect("/")
    console.log(data.result)
    try{
        if(data.result.ok){
            ctx.redirect("/")
        }
    }catch(err){
        console.log(err);
        return;
        ctx.redirect("/")
    }
})


//删除学员
router.get("/delete", async (ctx) => {
    var id = JSON.parse(ctx.query.id);
    var data = await DB.remove("user", {"_id":DB.getObjectID(id)})
    console.log(data);
    try{
        if(data.result.ok){
            ctx.redirect("/")
        }
    }catch(err){
        console.log(err);
        return;
        ctx.redirect("/")
    }
})


app
  .use(router.routes())             //启动路由
  .use(router.allowedMethods());    //可选     可自动设置响应头

app.listen(3000,()=>{
    console.log("listen 3000 ...")
})