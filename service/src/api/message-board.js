const Router = require("koa-router");
const mongoose = require("mongoose");
let router = new Router();

router.get("/list", async (ctx) => {
    let messageBoard = mongoose.model("messageBoard");
    let page = Number(ctx.query.page);
    let limit = Number(ctx.query.limit);
    let total = await messageBoard.find().count();
    await messageBoard.aggregate([{
            $sort: {
                "createDate": -1
            }
        },
        {
            $skip: (page - 1) * limit
        },
        {
            $limit: limit
        }
    ]).then(res => {
        ctx.body = {
            code: 200,
            message: {
                data: res,
                pageing: {
                    total,
                    page,
                    limit
                }
            }
        };
    });
});

//留言-新增
router.post("/add", async (ctx) => {
    let messageBoard = mongoose.model("messageBoard");
    const newMessageBoard = new messageBoard(ctx.request.body);
    await newMessageBoard.save().then(async () => {
        ctx.body = {
            code: 200,
            message: '新增成功'
        };
    });
});

module.exports = router;