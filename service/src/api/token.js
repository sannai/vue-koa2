const Router = require("koa-router");
let router = new Router();
const qiniu = require("qiniu");

//七牛云
router.get("/", async ctx => {
    // 密钥AK, SK
    const assessKey = "6NTsMbzpTdr6XvRy7apxiQkEY4DKtYHbUdjY8IIZ";
    const secretKey = "0BJFzBr6Q2uWCkHn5N5W83AMqW7OqFxHovUhoAEV";
    const mac = new qiniu.auth.digest.Mac(assessKey, secretKey);
    const options = {
        scope: "vuekao", //存储对象名字
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    ctx.body = {
        uploadToken,
    };
});

module.exports = router;
