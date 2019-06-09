//用户的增删改查

var router = require("koa-router")();

router.get("/",async (ctx) => {
    // ctx.body = "用户首页"
    await ctx.render("admin/user/index")
})

router.get("/add",async (ctx) => {
    // ctx.body = "增加用户"
    await ctx.render("admin/user/add")
})


router.get("/edit",async (ctx) => {
    // ctx.body = "编辑用户"
    await ctx.render("admin/user/edit")
})


router.get("/delete",async (ctx) => {
    ctx.body = "删除用户"
})


module.exports = router.routes();