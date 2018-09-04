const {db} = require('../Schema/config');
const UserSchema = require('../Schema/user');
const encryto = require('../util/encrypto');

//通过db 创建一个操作user数据库的对象
const User = db.model("users",UserSchema);

//用户注册
exports.reg = async (ctx) => {
    const user = ctx.request.body;
    const username = user.username;
    const password = user.password;

    //查询数据库 是否重合用户名
    await new Promise((resolve,reject) => {
        //user数据库查询
        User.find({username},(err,data) => {
            if (err){return reject(err)}
            if (data.length !== 0){
                //用户名已存在
                console.log(data);
                return resolve("")
            }

            //用户名不存在 存入数据库 自定义加密密码
            const _user = new User({
                username,
                password : encryto(password)
            });
            _user.save((err,data) => {
                if (err){
                    reject(err)
                }else {
                    resolve(data)
                }
            })
        })
    }).then(async data => {
        if (data){//注册成功
            await ctx.render('isok',{status : "注册成功"})
        } else {//用户名已存在
            await ctx.render('isok',{status : "用户名已存在"})
        }
    }).catch(async err => {
        //注册失败
        await ctx.render('isok',{status : "注册失败"})
    })
};

//用户登入
exports.login = async (ctx) => {
    const user = ctx.request.body;
    const username = user.username;
    const password = user.password;

    await new Promise((resolve,reject) => {
        //user数据库查询
        User.find({username},(err,data) => {
            if (err){return reject(err)}
            if (data.length ===0){
                //用户不存在
                return reject("用户不存在")
            }

            //匹配密码
            if (data[0].password === encryto(password)){
                //匹配成功
                resolve(data)
            }else {
                //匹配失败
                resolve("")
            }
        })
    })
        .then(async data => {
            if (data){
                await ctx.render('isok',{status : "登入成功"})
            }else {
                await ctx.render('isok',{status : "密码错误"})
            }

        })
        .catch(async err => {
            if (err === "用户不存在"){
                await ctx.render('isok',{status : "用户不存在"})
            }else {
                await ctx.render('isok',{status : "登入失败"})
            }
        })
};