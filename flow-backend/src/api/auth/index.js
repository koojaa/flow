import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';
import { isUserLoggedIn } from '../../lib/middlewares/isUserLoggedIn';

const { register, login, logout, isValidUser } = authCtrl;

const auth = new Router();

auth.post('/register', register);
auth.post('/login', login);
auth.post('/logout', isUserLoggedIn, logout);
auth.get('/isValidUser', isUserLoggedIn, isValidUser);

export default auth;
