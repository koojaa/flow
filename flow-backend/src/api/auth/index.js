import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.get('/test', authCtrl.test);

export default auth;
