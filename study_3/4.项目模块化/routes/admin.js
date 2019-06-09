const router = require("koa-router")();


var user = require("./admin/user")
var focus = require("./admin/focus")
var newscate = require("./admin/newscate")

//配置admin的子路由 层级路由 
router.get("/", (ctx) => {
    ctx.body = "后台管理系统"
})

router.use("/user", user);
router.use("/focus", focus);
router.use("/newscate", newscate);

module.exports = router;