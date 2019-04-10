//知识点
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const knowledgePointSchema = new Schema({
    name: String,
    createDate: { type: Date, default: Date.now } //创建时间
});

mongoose.model('knowledgePoint', knowledgePointSchema, 'knowledgePoint');