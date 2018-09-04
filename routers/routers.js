const Router = require('koa-router');
const user = require('../control/user');
const router = new Router();

//设计主页
router.get('/',async(ctx) => {
    await ctx.render("index",{
        title : "假装这是正经的博客",
        // session : {
        //     role : 0
        // }
    })
});

//动态路由 主要用来处理 用户登入 注册 退出
router.get(/^\/user\/(?=reg|login)/,async(ctx) => {
    const show = /reg$/.test(ctx.path);
    await ctx.render('register',{
        show
    })
});

//用户登入
router.post('/user/login', user.login );

//用户注册
router.post('/user/reg', user.reg );



module.exports = router;