import {} from './lib/envPreloader';
const { PORT: port } = process.env;

import Koa from 'koa';
const server = new Koa();

server.listen(port, () => {
  console.log(`on port ${port}`);
});
