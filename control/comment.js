const {db} = require('../Schema/config');

//关联什么库，就需要操作库的对象
const UserSchema = require('../Schema/user');
const User = db.model("users",UserSchema);

const ArticleSchema = require('../Schema/article');
const Article = db.model("articles",ArticleSchema);

const CommentSchema = require('../Schema/comment');
const Comment = db.model("comments",CommentSchema);


//发表评论
exports.save = async ctx => {
    let message = {
        status: 0,
        msg : "用户未登录"
    };

    //用户未登录
    if (ctx.session.isNew) {return ctx.body = message}

    //用户已登录

    //获取数据
    const data = ctx.request.body;
    data.from = ctx.session.uid;



    //保存评论到库
    await new Comment(data)
        .save()
        .then(data => {
            message = {
                status: 1,
                msg : "评论成功"
            };
            Article
                .update({_id : data.article},{$inc:{commentNum:1}},err => {
                    if (err){return console.log(err)}
                });
            User
                .update({_id : data.from},{$inc:{commentNum:1}},err => {
                    if (err){return console.log(err)}
                });
        })
        .catch(err => {
            message = {
                status: 0,
                msg : err
            }
        });

    ctx.body = message
};