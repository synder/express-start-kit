'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleSchema = undefined;

var _mongoose = require('mongoose');

var ObjectId = _mongoose.Schema.Types.ObjectId; /**
                                                 * Created by on 2017/6/19.
                                                 */

var VehicleSchema = new _mongoose.Schema({
  status: { type: Number, required: true },
  title: { type: String, required: false },
  list: { type: Array, required: true },
  platform: { type: String, required: true },
  create_time: { type: Date, required: true },
  update_time: { type: Date, required: true }
});

exports.VehicleSchema = VehicleSchema;