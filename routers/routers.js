const Router = require('koa-router');
const user = require('../control/user');
const article = require('../control/article');
const router = new Router();

//设计主页
router.get('/',user.keepLogin,async(ctx) => {
    await ctx.render("index",{
        title : "假装正经的博客",
        session : ctx.session
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


//用户退出
router.get('/user/logout', user.logout);

//文章发表页面
router.get('/article',user.keepLogin,article.addPage);

//文章发表
router.post('/article',user.keepLogin,article.add);



module.exports = router;