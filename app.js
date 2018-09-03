const koa = require('koa');
const router = require('./routers/routers');
const static = require('koa-static');
const views = require('koa-views');
const {join} = require('path');

//生成app实例
const app = new koa();

//配置pug资源目录
app.use(views(join(__dirname, "views"),{
    extension: 'pug'
}));

//配置静态资源目录
app.use(static(join(__dirname, "public")));




//注册路由信息
app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000);