import * as Koa from 'koa';
const api = require('koa-router')({
  prefix: '/api'
});

// 公开的api，不需要签名、授权验证
api.use('/auth', require('../controllers/user').routes());


export default {
  init(app: Koa): void {
    app.use(api.routes()).use(api.allowedMethods());
    //initGraphQL(app);
  }
};
