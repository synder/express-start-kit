'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CouponSchema = undefined;

var _mongoose = require('mongoose');

var ObjectId = _mongoose.Schema.Types.ObjectId; /**
                                                 * @author cyb
                                                 * @copyright cyb.com
                                                 * @desc
                                                 */

var CouponSchema = new _mongoose.Schema({
  status: { type: Number, required: true },
  app_name: { type: String, required: true },
  app_key: { type: String, required: true },
  app_secret: { type: String, required: true },
  create_time: { type: Date, required: true },
  update_time: { type: Date, required: true }
});

exports.CouponSchema = CouponSchema;