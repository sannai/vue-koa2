const Router = require("koa-router");
const mongoose = require("mongoose");
let router = new Router();

router.get("/list", async ctx => {
    let message = mongoose.model("message");
    let page = Number(ctx.query.page);
    let limit = Number(ctx.query.limit);
    let total = await message.find().count();
    await message
        .aggregate([
            {
                $sort: {
                    createDate: -1,
                },
            },
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: limit,
            },
        ])
        .then(res => {
            ctx.body = {
                code: 200,
                message: {
                    data: res,
                    pageing: {
                        total,
                        page,
                        limit,
                    },
                },
            };
        });
});

//留言-新增
router.post("/add", async ctx => {
    let message = mongoose.model("message");
    const newMessage = new message(ctx.request.body);
    await newMessage.save().then(async () => {
        ctx.body = {
            code: 200,
            message: "新增成功",
        };
    });
});

module.exports = router;
