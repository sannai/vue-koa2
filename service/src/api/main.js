/********************main-首页**********************************/

const Router = require("koa-router");
const mongoose = require("mongoose");

const router = new Router();

//列表
router.get("/list", async ctx => {
    let page = Number(ctx.query.page);
    let limit = Number(ctx.query.limit);
    let keyWord = ctx.query.keyWord ? ctx.query.keyWord : "";
    let articleList = mongoose.model("articleList");
    await articleList
        .aggregate([
            {
                $match: {
                    title: {
                        $regex: keyWord,
                    },
                },
            },
            {
                $lookup: {
                    from: "comment",
                    localField: "_id",
                    foreignField: "aticleId",
                    as: "commentList",
                },
            },
            {
                $project: {
                    __v: 0,
                    content: 0,
                },
            },
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
        .exec()
        .then(val => {
            val.forEach((item, index) => {
                item.commentList.forEach(t => {
                    item.commentNumber = t.content.length;
                });
                delete item.commentList;
            });
            ctx.body = {
                success: 200,
                message: {
                    data: val,
                    page: {
                        total: val.length,
                        page,
                        limit,
                    },
                },
            };
        });
});

//详情
router.get("/:id", async ctx => {
    let article = mongoose.model("articleList");
    //关联查询
    await article
        .aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(ctx.params.id),
                },
            },
            {
                $project: {
                    __v: 0,
                },
            },
        ])
        .exec()
        .then(val => {
            ctx.body = {
                success: 200,
                message: val,
            };
        })
        .catch(err => {
            ctx.body = {
                code: 500,
                message: {
                    data: err,
                    text: "查看失败",
                },
            };
        });
});

//新增
router.post("/add", async ctx => {
    let addArticle = mongoose.model("articleList");
    let newIndexData = new addArticle(ctx.request.body);
    let comment = mongoose.model("comment");

    await newIndexData
        .save()
        .then(res => {
            let newComment = new comment({
                aticleId: res._id,
                content: [],
            });
            ctx.body = {
                code: 200,
                message: "新增成功",
            };
            newComment.save();
        })
        .catch(error => {
            ctx.body = {
                code: 500,
                message: error,
            };
        });
});

//删除
router.delete("/delete/:id", async ctx => {
    let addArticle = mongoose.model("articleList");
    let comment = mongoose.model("comment");
    await addArticle
        .remove({
            _id: ctx.params.id,
        })
        .then(async res => {
            await comment.remove({
                aticleId: ctx.params.id,
            });
            ctx.body = {
                code: 200,
                message: "删除成功",
            };
        })
        .catch(error => {
            ctx.body = {
                code: 500,
                message: error,
            };
        });
});

//修改
router.put("/edit/:id", async ctx => {
    let article = mongoose.model("articleList");
    console.log(ctx.request.body);
    //关联查询
    await article
        .update(
            {
                _id: ctx.params.id,
            },
            {
                $set: {
                    title: ctx.request.body.title,
                    content: ctx.request.body.content,
                    introduction: ctx.request.body.introduction,
                },
            }
        )
        .then(res => {
            ctx.body = {
                code: 200,
                message: {
                    text: "修改成功",
                },
            };
        });
});

//详情-评论
router.get("/comment/:id", async ctx => {
    let article = mongoose.model("comment");
    let page = Number(ctx.query.page);
    let limit = Number(ctx.query.limit);
    let totalData = await article
        .find({
            aticleId: ctx.params.id,
        })
        .populate({
            path: "content", //对应auditOpinion表 设置字段
            populate: {
                path: "content",
            },
        });

    await article
        .aggregate([
            {
                $match: {
                    aticleId: mongoose.Types.ObjectId(ctx.params.id),
                },
            },
            {
                $unwind: "$content",
            },
            {
                $sort: {
                    "content.createDate": -1,
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
            let total = totalData[0].content.length;
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

//评论-新增
router.post("/add-comment/:id", async ctx => {
    let comment = mongoose.model("comment");
    await comment
        .update(
            {
                aticleId: ctx.params.id,
            },
            {
                $push: {
                    content: ctx.request.body,
                },
            }
        )
        .then(async res => {
            ctx.body = {
                code: 200,
                message: {
                    data: res,
                    text: "新增成功",
                },
            };
        })
        .catch(err => {
            ctx.body = {
                code: 500,
                message: {
                    data: err,
                    text: "新增失败",
                },
            };
        });
});

module.exports = router;
