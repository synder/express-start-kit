'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.home = home;

var _account = require('../../model/user/account');

var userAccountModel = _interopRequireWildcard(_account);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

async function home(req, res, next) {

  var x = await userAccountModel.findUserByName();

  res.json({
    code: '0000',
    msg: '',
    payload: {
      ok: x
    }
  });
} /**
   * @author 
   * @copyright
   * @desc
   */