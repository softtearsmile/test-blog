const {Schema} = require('./config');
const ObjectId = Schema.Types.ObjectId;
const ArticleSchema = new Schema({
    title : String,
    content : String,
    tips : String,
    commentNum : Number,
    author : {
        type : ObjectId,
        ref : "users"
    },
},{
    versionKey : false,
    timestamps : {
        createdAt : "created"
    }
});

module.exports = ArticleSchema;