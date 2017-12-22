/**
 * @author synder
 * @date 16/1/10
 * @desc
 */

import {Router} from 'express';

import * as account from '../../controller/user/account';

const userRouter = new Router();

userRouter.get('/', account.home);

export {userRouter};