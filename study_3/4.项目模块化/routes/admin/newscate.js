//轮播图管理
const router = require("koa-router")();



//配置admin的子路由 层级路由 
router.get("/",async (ctx) => {
    ctx.body = "新闻分类首页"
})

router.get("/add",async (ctx) => {
    ctx.body = "增加新闻分类"
})

router.get("/edit",async (ctx) => {
    ctx.body = "编辑新闻分类"
})

router.get("/delete",async (ctx) => {
    ctx.body = "删除新闻分类"
})



module.exports = router.routes();