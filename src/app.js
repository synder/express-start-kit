/**
 * @author synder
 * @date 16/1/10
 * @desc create http server
 */

import express from 'express';

import * as xpress from './lib/xpress';
import config from './config';

xpress.extend();

global.config = config;

const app = express();

app.set('x-powered-by', false);
app.set('trust proxy', true);


import {json, urlencoded} from 'body-parser';
import cookie from 'cookie-parser';
import timeout from 'connect-timeout';
import compression from 'compression';


app.use(compression());
app.use(timeout('20s'));
app.use(cookie());
app.use(json());
app.use(urlencoded({
  extended: true
}));


import {userRouter} from './router/user';

app.use(userRouter);

export default app;