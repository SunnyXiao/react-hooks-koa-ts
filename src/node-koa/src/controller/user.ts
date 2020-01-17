import * as Koa from 'koa';
const router = require('koa-router')();

router.get('/register', async (ctx: any) => {
  ctx.status = 200
})
