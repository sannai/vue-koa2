const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//留言
const messageSchema = new Schema({
    replyName: String,
    name: String,
    content: String,
    pid: Schema.Types.ObjectId,
    hierarchy: {
        type: Number,
        default: 1,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
});

//发布模型
mongoose.model("message", messageSchema, "message");
