'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoreSchema = exports.StoreGroupSchema = undefined;

var _mongoose = require('mongoose');

var ObjectId = _mongoose.Schema.Types.ObjectId; /**
                                                 * @author cyb
                                                 * @copyright cyb.com
                                                 * @desc store
                                                 */

var StoreGroupSchema = new _mongoose.Schema({});

var StoreSchema = new _mongoose.Schema({});

exports.StoreGroupSchema = StoreGroupSchema;
exports.StoreSchema = StoreSchema;