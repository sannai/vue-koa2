const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const path = require("path");
const hostname = "0.0.0.0";
// const hostname = '127.0.0.1';
const statics = require("koa-static"); //静态文件
const bodyParser = require("koa-bodyparser"); //获取数据
const cors = require("koa2-cors"); //跨域
const cpmpress = require("koa-compress"); //开启gzip

const { connect, initSchemas } = require("./src/database/init");
const staticPath = "./static";

const options = {
    threshold: 2048,
};

app.use(cpmpress(options));
app.use(bodyParser());
app.use(cors());
app.use(statics(path.join(__dirname, staticPath)));

let router = new Router();
let token = require("./src/api/token.js");
let main = require("./src/api/main.js");
let message = require("./src/api/message.js");
let knowledge = require("./src/api/knowledge.js");

router.use("/token", token.routes());
router.use("/article", main.routes());
router.use("/message", message.routes());
router.use("/knowledge", knowledge.routes());
app.use(router.routes());
app.use(router.allowedMethods()); //立即执行数据库链接

(async () => {
    connect();
    initSchemas();
})();

app.listen(3000, hostname, () => {
    console.log(1);
});
