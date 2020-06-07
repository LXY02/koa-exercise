const Koa = require('koa');
const Router = require('koa-router');
const Http = require('http');
const Querystring = require('querystring');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

const Service = {
    search: async (kw = '') => {
        return new Promise((resolve, reject) => {
            Http.request({
                hostname: 'm.maoyan.com',
                path: '/ajax/search?' + Querystring.stringify({
                    kw,
                    cityId: 10
                })
            }, (res) => {
                res.setEncoding('utf8');
                let data = [];
                res.on('data', chunk => {
                    data.push(chunk);
                }).on('end', () => {
                    console.log('----- ', data);
                    resolve(data.join(''));
                });
            }).end();
        })
    }
};

router.get('/', async (ctx) => {
    let {kw} = ctx.query;
    let data = await Service.search(kw);
    ctx.response.type='json';
    ctx.response.body = {data};
});

router.post('/', async ctx => {
    console.log('--- ', ctx.request.body);
    const {name} = ctx.request.body;
    ctx.body = name;
});

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000, () => {
    console.log('server running');
});

// http://localhost:3000/?kw=捉妖记
