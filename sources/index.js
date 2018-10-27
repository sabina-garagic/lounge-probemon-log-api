const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const logModule = require('./log.module');

const app = new Koa();
const router = new Router();

logModule.setupRoutes(router);

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8080);