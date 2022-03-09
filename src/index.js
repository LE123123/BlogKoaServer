const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// const api = require('./api');
const posts = require('./api/posts');

const app = new Koa();
const router = new Router();

// 라우터 설정
// api 라우트 적용
// router.use('/api', api.routes());

// posts 라우트 적용
router.use('/api/posts', posts.routes());

// 라우터 적용 전에 bodeyParser 적용
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
