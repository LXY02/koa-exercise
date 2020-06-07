const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const router = new Router();
const app = new koa();
const {sign} = require('jsonwebtoken');
const secret = 'demo';
const jwt = require('koa-jwt')({secret});

router
    .post('/api/login', async (ctx, next) => {
        const user = ctx.request.body;
        console.log('*** ', user);
        if (user && user.username) {
            console.log('---');
            const {username} = user;
            // 生成Token，secret作为密钥需要开发者设置，expiresIn为失效时间，不要设置太久
            const token = sign({username}, secret, {expiresIn: '1h'});
            ctx.body = {
                message: 'Get Token Success',
                code: 1,
                token
            };
        } else {
            ctx.body = {
                message: 'Param Error',
                code: -1
            };
        }
    })
    .get('/api/userInfo', jwt, async ctx => { // 获取用户信息，需要校验
        ctx.body = {
            username: ctx.state.user.username
        }
    });

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => {
    console.log('server running');
})
