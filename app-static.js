const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');

app
    .use(serve('.')) // 设置项目根目录为静态资源根路径
    .listen(3000, () => {
        console.log('running');
    });
