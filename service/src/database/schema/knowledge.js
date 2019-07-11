//知识点
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const knowledgeSchema = new Schema({
    name: String,
    createDate: {
        type: Date,
        default: Date.now,
    }, //创建时间
});

mongoose.model("knowledge", knowledgeSchema, "knowledge");
