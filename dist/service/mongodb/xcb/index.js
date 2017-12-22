'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongoose = exports.client = undefined;

var _mongoose = require('mongoose');

var mongoose = _interopRequireWildcard(_mongoose);

var _config = require('../../config');

var config = _interopRequireWildcard(_config);

var _coupon = require('./schema/coupon');

var coupon = _interopRequireWildcard(_coupon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @author synder
 * @date 16/1/10
 * @desc
 */

mongoose.Promise = global.Promise;

var CONFIG = config.mongodb.xcb;

if (!CONFIG) {
  throw new Error('please provide mongodb config');
}

var client = mongoose.createConnection(CONFIG.url, {
  user: CONFIG.user,
  pass: CONFIG.pass
});

client.on('error', function (err) {
  console.error(err.stack);
});

client.model('Coupon', coupon.CouponSchema, 'coupon');

exports.client = client;
exports.mongoose = mongoose;