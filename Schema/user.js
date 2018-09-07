const {Schema} = require('./config');

const UserSchema = new Schema({
    username : String,
    password : String,
    role : {
        type: Number,
        default: 1,
    },
    avatar : {
        type : String,
        default : "/avatar/default.jpg" //默认值
    },
    articleNum : Number,
    commentNum : Number,
},{versionKey:false});

module.exports = UserSchema;