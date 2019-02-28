/********************main-首页**********************************/

const Router = require("koa-router");
const mongoose = require("mongoose");
const qiniu = require('qiniu');
let router = new Router();
//列表
router.get("/", async ctx => {
    let articleList = mongoose.model("articleList");
    await articleList.aggregate([
        {
            $lookup: {
                from: "comment",
                localField: "_id",
                foreignField: "aticleId",
                as: 'commentList'
            }
        },
        {
            $project: {
                __v: 0,
                content: 0
            }
        }
    ]).exec().then((val) => {
        val.forEach((item, index) => {
            item.commentList.forEach(t => {
                item.commentNumber = t.content.length;

            });
        });
        ctx.body = { success: 200, message: val };
    });
});

//详情
router.get("/article-details/:id", async ctx => {
    let article = mongoose.model("articleList");
    //关联查询
    await article.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(ctx.params.id) }
        },
        {
            $project: {
                __v: 0
            }
        }])
        .exec()
        .then((val) => {
            ctx.body = { success: 200, message: val };
        }).catch(err => {
            ctx.body = {
                code: 500,
                message: {
                    data: err,
                    text: '查看失败'
                }
            };
        });;
});

//详情-评论
router.get("/article-details/comment/:id", async ctx => {
    let article = mongoose.model("comment");
    let page = Number(ctx.query.page);
    let limit = Number(ctx.query.limit);
    let data = [];
    let totalData = await article.find({aticleId: ctx.params.id}).populate({
        path: 'content', //对应auditOpinion表 设置字段
        populate: { path: 'content' }
    });
    let total = totalData[0].content.length;
    await article.aggregate([
        {
            $match: { aticleId: mongoose.Types.ObjectId(ctx.params.id) }
        },
        {
            $unwind: "$content"
        },
        {
            $skip: (page-1)*limit
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
    

    // await article.aggregate([
    //     {
    //         $match: { aticleId: mongoose.Types.ObjectId(ctx.params.id) }
    //     },
    //     {
    //         $project: {
    //             __v: 0
    //         }
    //     }
    // ]).exec().then((val) => {
    //     ctx.body = { success: 200, message: val };
    // }).catch(err => {
    //     ctx.body = {
    //         code: 500,
    //         message: {
    //             data: err,
    //             text: '获取失败'
    //         }
    //     };
    // });;
});

//新增
router.post("/add-article", async (ctx) => {
    let addArticle = mongoose.model("articleList");
    let newIndexData = new addArticle(ctx.request.body);
    let comment = mongoose.model("comment");

    await newIndexData.save()
        .then((res) => {
            let newComment = new comment({
                aticleId: res._id,
                content: []
            });
            ctx.body = {
                code: 200,
                message: '新增成功'
            };
            newComment.save();
        }).catch(error => {
            ctx.body = {
                code: 500,
                message: error
            };
        });
});

//评论-新增
router.post("/add-comment/:id", async (ctx) => {
    let comment = mongoose.model("comment");
    await comment.update({
        aticleId: ctx.params.id
    }, {
        $push: {
            content: ctx.request.body
        }
    }).then(res => {
        ctx.body = {
            code: 200,
            message: {
                data: res,
                text: '新增成功'
            }
        };
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: {
                data: err,
                text: '新增失败'
            }
        };
    });

});

//评论-标签
router.post("/add-label", async (ctx) => {
    let label = mongoose.model("label");
    await label.update({
        $push: {
            tag: ctx.request.body
        }
    }).then(res => {
        ctx.body = {
            code: 200,
            message: {
                data: res,
                text: '新增成功'
            }
        };
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: {
                data: err,
                text: '新增失败'
            }
        };
    });
});

//七牛云
router.get("/token", async (ctx) => {
    // 密钥AK, SK
    const assessKey = '6NTsMbzpTdr6XvRy7apxiQkEY4DKtYHbUdjY8IIZ';
    const secretKey = '0BJFzBr6Q2uWCkHn5N5W83AMqW7OqFxHovUhoAEV';
    const mac = new qiniu.auth.digest.Mac(assessKey, secretKey);
    const options = {
        scope: 'vuekao' //存储对象名字
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    ctx.body = {
        uploadToken
    };
});

module.exports = router;
