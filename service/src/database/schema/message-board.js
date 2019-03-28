const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//留言
const messageBoardSchema = new Schema({
    replyName: String,
    commentName: String,
    commentContent: String,
    commentPid: Schema.Types.ObjectId,
    hierarchy: {
        type: Number,
        default: 1
    },
    createDate: { type: Date, default: Date.now }
});

//发布模型
mongoose.model('messageBoard', messageBoardSchema, 'messageBoard');