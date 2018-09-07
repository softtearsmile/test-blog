const {Schema} = require('./config');
const ObjectId = Schema.Types.ObjectId;

//内容 评论人(用户名 头像)
const CommentSchema = new Schema({
    content : String,
    from : {
        type : ObjectId,
        ref : "users"
    },
    article : {
        type : ObjectId,
        ref : "articles"
    },
},{
    versionKey : false,
    timestamps : {
        createdAt : "created"
    }
});

module.exports = CommentSchema;