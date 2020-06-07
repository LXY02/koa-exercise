const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();
const mongoose = require('mongoose');

const {addCourse, getCourseList} = require('./database-api');

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/koa');
}

async function close() {
    await mongoose.connection.close();
}


app.use(bodyparser());

app.use(async (ctx, next) => {
    await connect(); // 处理请求前，建立连接
    await next(); // 处理请求
    await close(); // 处理请求后，关闭连接
});

const JSON_MIME = 'application/json';

router.get('/course', async ctx => {
    // ctx.type = JSON_MIME;
    ctx.body = {
        status: 0,
        data: await getCourseList()
    }
});

router.post('/course', async ctx => {
   ctx.type = JSON_MIME;
   await addCourse(ctx.request.body);
   ctx.body = {
       status: 0
   };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('database running');
});



