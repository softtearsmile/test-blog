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

//生成超级管理员
{
    const {db} = require('./Schema/config');
    const UserSchema = require('./Schema/user');
    const encryto = require('./util/encrypto');
    const User = db.model("users",UserSchema);

    //查找是否已有超级管理
    User
        .find({username: "admin"})
        .then((data) => {
            if (data.length ===0){
                //创建超级管理员
                new User({
                    username : "admin",
                    password : encryto("admin"),
                    role : 666,
                    articleNum : 0,
                    commentNum : 0,
                }).save((err,data) => {
                    if (err){return console.log(err)}
                    console.log("超级管理员账号;admin,超级管理员密码;admin")
                })
            }else {
                //已有超级管理员
                console.log("超级管理员账号;admin,超级管理员密码;admin")
            }
        }).catch(err => console.log(err))
}




//注册路由信息
app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000);