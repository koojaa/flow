import {} from './lib/envPreloader';
import api from './api';
const { PORT: port } = process.env;

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import db from './db';
db();

const server = new Koa();
const router = new Router();

router.use('/api', api.routes());

server.use(bodyParser());
server.use(router.routes()).use(router.allowedMethods());

server.listen(port, () => {
  console.log(`on port ${port}`);
});
