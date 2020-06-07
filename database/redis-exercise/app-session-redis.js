const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');
const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');
const {promisify} = require('util');

const hgetallAsync = promisify(client.hgetall).bind(client);
app.keys = ['some secret hurr'];
const store = {
    get: async(key, maxAge) => {
        return await hgetallAsync(key);
    },
    set: (key, sess, maxAge) => {
        client.hmset(key, sess);
    },
    destroy: (key) => {
        client.hdel(key);
    }
};
const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    store
};

app.use(session(CONFIG, app));
app.use(ctx => {
    if (ctx.path === '/favicon.ico') return;
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + ' views';
});
app.listen(3000, () => {
    console.log('session redis running');
});

