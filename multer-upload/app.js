const Koa = require('koa');
const Router = require('koa-router');
const multer = require('koa-multer');
const nunjucks = require('koa-nunjucks-2');
const path = require('path');
const app = new Koa();
const router = new Router();

const storage = multer.diskStorage({
    // 存储的位置
    destination: path.resolve("upload"),
    // 文件名
    filename(req, file, cb){
        console.log('---- ', file.originalname);
        const filename = file.originalname.split(".")
        cb(null, `${Date.now()}.${filename[filename.length - 1]}`)
    }
});

const upload = multer({storage});

router.post('/upload', upload.single('file'), async ctx => {
    ctx.body = {
        filename: ctx.req.file.filename
    }
});

router.get('/',async (ctx, next)=>{
    let title = 'hello koa2';
    await ctx.render('index', {
        title
    });
});

app
    .use(nunjucks({
        ext: 'html',
        path: path.resolve('views'),
        nunjucksConfig: {
            trimBlocks: true // 开启转义，防止 Xss 漏洞
        }
    }))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000, () => {
        console.log('upload running --');
    });
