'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRouter = undefined;

var _express = require('express');

var _account = require('../../controller/user/account');

var account = _interopRequireWildcard(_account);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @author synder
 * @date 16/1/10
 * @desc
 */

var userRouter = new _express.Router();

userRouter.get('/', account.home);

exports.userRouter = userRouter;