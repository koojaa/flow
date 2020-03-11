const Koa = require('koa');
const server = new Koa();

server.use(ctx => {
	ctx.body = 'hello world!';
});

server.listen(4000, () => {
	console.log('server on port 4000');
});
