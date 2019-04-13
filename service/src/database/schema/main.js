const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//文章-列表
const articleListSchema = new Schema({
    title: String, //标题
    introduction: String, //简介
    content: String, //内容
    readNumber: { //阅读数量
        type: Number,
        default: 0
    },
    commentNumber: { //评论
        type: Number,
        default: 2000
    },
    knowledge: { //知识点
        type: Array,
        default: [{
            id: 1,
            name: 'javascript'
        }]
    },
    createDate: {
        type: Date,
        default: Date.now
    } //创建时间
});

//文章-评论
const commentSchema = new Schema({
    aticleId: {
        type: Schema.Types.ObjectId
    },
    userName: {
        type: String
    },
    content: [{
        replyName: String,
        commentName: String,
        commentContent: String,
        commentPid: Schema.Types.ObjectId,
        createDate: {
            type: Date,
            default: Date.now
        },
        hierarchy: {
            type: Number,
            default: 1
        },
        count: {
            type: Number,
            default: 0
        }
    }],
    createDate: {
        type: Date,
        default: Date.now
    }
});

//发布模型
mongoose.model('articleList', articleListSchema, 'articleList');
mongoose.model('comment', commentSchema, 'comment');