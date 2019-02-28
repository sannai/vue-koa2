//商品详情信息
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
let router = new Router();

const mongoose = require('mongoose');
const fs = require('fs');

router.get('/insertInfo', async (ctx) => {
    fs.readFile('./data_json/goods.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        console.log(data.RECORDS instanceof Object,66);
        let saveCount = 0;
        
        const Goods = mongoose.model('Goods');
        data.RECORDS.forEach((value, index) => {
            if(index > 10 ) {
                return;
            }else {
                let newGoods = new Goods(value);
                newGoods.save().then(() => {
                    saveCount++;
                    console.log('成功', saveCount);
                }).catch(err => {
                    console.log('失败', saveCount);
                });
            }
        });
        
    });
    ctx.body = '开始导入数据';
});

module.exports = router;
// const Koa = require('koa');
// const app = new Koa();
// const Router = require('koa-router');
// let router = new Router();
// const mongoose = require('mongoose');
// const fs = require('fs');
// router.get('/insertAllGoodsInfo', async (ctx) => {
//     fs.readFile('./goods.json', 'utf8', (err, data) => {
//         data = JSON.parse(data);
//         let saveCount = 0;
//         const Goods = mongoose.model('Goods');
//         data.map((value, index) => {
//             console.log(value);
//             let newGoods = new Goods(value);
//             newGoods.save().then(() => {
//                 saveCount++;
//                 console.log('成功' + saveCount);
//             }).catch(error => {
//                 console.log('失败：' + error);
//             });
//         });
//     });
//     ctx.body = "开始导入数据";
// });
// module.exports = router;