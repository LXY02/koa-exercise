const koa = require('koa');
const app = new koa();
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const router = new Router();

router.get('/:id', async (ctx, next) => {
    console.log('*** ', ctx.params);
    console.log('--- ', ctx.request.query, ctx.request.querystring);
    ctx.body = ctx.request.querystring;
});

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods()); // 对异常状态码的处理

app.listen(3000, () => {
    console.log('server running - 1');
});
