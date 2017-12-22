/**
 * @author synder
 * @date 16/1/10
 * @desc
 */

import * as mongoose from 'mongoose';
import * as config from '../../config';

mongoose.Promise = global.Promise;

const CONFIG = config.mongodb.core;

if (!CONFIG) {
  throw new Error('please provide mongodb config');
}

const client = mongoose.createConnection(CONFIG.url, {
  user: CONFIG.user,
  pass: CONFIG.pass
});

client.on('error', function (err) {
  console.error(err.stack);
});

import * as vehicle from './schema/vehicle';
import * as customer from './schema/customer';

client.model('Vehicle', vehicle.VehicleSchema, 'vehicle');
client.model('Customer', customer.CustomerSchema, 'customer');

export {client, mongoose};