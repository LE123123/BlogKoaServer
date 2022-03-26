/* eslint-disable no-undef */
require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';
import cors from '@koa/cors';

const { PORT } = process.env;

// import createFakeData from './createFakeData';
mongoose
  .connect(
    'mongodb+srv://hyunseo:gustj486!!@cluster0.3g9wa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      dbName: 'blog',
    },
  )
  .then(() => {
    console.log('Connected to MongoDB');
    // createFakeData();
  })
  .catch((e) => {
    console.error(e);
  });

import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';

const app = new Koa();
const router = new Router();

let corsOption = {
  origin: process.env.CLIENT_HOST,
  credentials: true,
};

router.use('/api', api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);

app.use(cors(corsOption));

app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../../blog-frontend/build');
app.use(serve(buildDirectory));
app.use(async (ctx) => {
  // Not Found이고, 주소가 /api로 시작하지 않는 경우
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    // index.html의 내용을 반환
    await send(ctx, 'index.html', { root: buildDirectory });
  }
});

const port = PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
