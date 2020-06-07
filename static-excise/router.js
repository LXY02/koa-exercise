const router = require('koa-router')();

const HomeController = require('./controller/home');
module.exports = app => {
    router.get('/', HomeController.index);
    router.get('/login', HomeController.login);
    router.post('/user/register', HomeController.register);
    app
        .use(router.routes())
        .use(router.allowedMethods());
};
