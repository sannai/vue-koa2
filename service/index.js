const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const path = require('path');
const hostname = '0.0.0.0';
const statics = require('koa-static'); //静态文件
const bodyParser = require('koa-bodyparser'); //获取数据
const cors = require('koa2-cors'); //跨域
const cpmpress = require('koa-compress'); //开启gzip
const staticPath = './static';
const { connect, initSchemas } = require('./src/database/init');
const options = { threshold: 2048 };
app.use(cpmpress(options));
app.use(bodyParser());
app.use(cors());
app.use(statics(
    path.join(__dirname, staticPath)
));
let router = new Router();
let index = require('./src/appApi/main.js');
let messageBoard = require('./src/appApi/message-board.js');
let knowledgePoint = require('./src/appApi/knowledge-point.js');
router.use('/index', index.routes());
router.use('/message-board', messageBoard.routes());
router.use('/knowledge-point', knowledgePoint.routes());
app.use(router.routes());
app.use(router.allowedMethods());

;//立即执行数据库链接
(async () => {
    connect();
    initSchemas();
})();

app.listen(3000, hostname, () => {
    console.log(1);
});