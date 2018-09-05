const {db} = require('../Schema/config');
const ArticleSchema = require('../Schema/article');

//通过db 创建一个操作user数据库的对象
const Article = db.model("articles",ArticleSchema);

//文章发表页
exports.addPage = async ctx => {
    await ctx.render("add-article",{
        title : "假装正经的文章发表页",
        session : ctx.session
    })
};

//文章发表(存到数据库)
exports.add = async ctx => {
    //用户未登录
    if (ctx.session.isNew){
        return ctx.body = {
            msg : "用户未登录",
            status : 0,
        }
    }

    //用户已登录

    //文章数据
    const data = ctx.request.body;
    data.article = ctx.session.username;

    //存到数据库
    await new Promise((resolve,reject) => {
        new Article(data)
            .save((err,data) => {
            if (err){return reject(err)}
            resolve(data)
        })
    })
        .then(data => {
            ctx.body = {
                msg : "发表成功",
                status : 1,
            }
        })
        .catch(err => {
            ctx.body = {
                msg : "发表失败",
                status : 0,
            }
        })
};