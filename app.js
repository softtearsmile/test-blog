const koa = require('koa');
const router = require('./routers/routers');
const static = require('koa-static');
const views = require('koa-views');
const body = require('koa-body');
const session = require(('koa-session'));
const {join} = require('path');

//生成app实例
const app = new koa();



//配置session
app.keys = ["我只是个签名"];
const CONFIG = {
    key : "Sid", //方便查找 (改)
    maxAge : 36e5, //保存的时间ms (改)
    overwrite : true, //是覆盖
    httpOnly: true, //不能让客户端访问这个coookie
    signed : true, //能签名
    rolling : true //记录最后一次操作保存
};

//注册session
app.use(session(CONFIG,app));

//配置koa-body 处理 post请求数据
app.use(body());

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