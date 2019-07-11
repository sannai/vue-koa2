const Router = require("koa-router");
const mongoose = require("mongoose");
let router = new Router();

//知识点 列表
router.get("/list", async ctx => {
    let knowledge = mongoose.model("knowledge");
    await knowledge
        .find({})
        .sort({
            createDate: 1,
        })
        .exec()
        .then(res => {
            ctx.body = {
                code: 200,
                message: {
                    data: res,
                },
            };
        });
});

module.exports = router;
