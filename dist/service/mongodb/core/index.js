'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongoose = exports.client = undefined;

var _mongoose = require('mongoose');

var mongoose = _interopRequireWildcard(_mongoose);

var _config = require('../../config');

var config = _interopRequireWildcard(_config);

var _vehicle = require('./schema/vehicle');

var vehicle = _interopRequireWildcard(_vehicle);

var _customer = require('./schema/customer');

var customer = _interopRequireWildcard(_customer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @author synder
 * @date 16/1/10
 * @desc
 */

mongoose.Promise = global.Promise;

var CONFIG = config.mongodb.core;

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

client.model('Vehicle', vehicle.VehicleSchema, 'vehicle');
client.model('Customer', customer.CustomerSchema, 'customer');

exports.client = client;
exports.mongoose = mongoose;