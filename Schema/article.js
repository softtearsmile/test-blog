const {Schema} = require('./config');

const ArticleSchema = new Schema({
    title : String,
    content : String,
    article : String,
    tips : String,
},{
    versionKey : false,
    timestamps : { //代码提示有问题 应该是timestamp + s !
        createdAt : "created"
    }
});

module.exports = ArticleSchema;