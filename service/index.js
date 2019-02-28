const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const path = require('path');
const hostname = '0.0.0.0';
// const server = require('http').createServer(app.callback());
// const io = require('socket.io')(server);
const statics = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const staticPath = './static';
const { connect, initSchemas } = require('./src/database/init');
const { chat } = require('./src/appApi/chat');
app.use(bodyParser());
app.use(cors());
app.use(statics(
    path.join(__dirname, staticPath)
));
let router = new Router();
let index = require('./src/appApi/main.js');
let messageBoard = require('./src/appApi/message-board.js');
// let goods = require('./appApi/goods.js');
router.use('/index', index.routes());
router.use('/message-board', messageBoard.routes());
// router.use('/goods', goods.routes());
app.use(router.routes());
app.use(router.allowedMethods());

//在线聊天
// chat(io);

;//立即执行数据库链接
(async () => {
    connect();
    initSchemas();
})();

app.listen(3000, hostname, () => {
    console.log(1);
});