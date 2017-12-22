/**
 * @author synder
 * @date 16/1/10
 * @desc
 */

import * as mongoose from 'mongoose';
import * as config from '../../config';

mongoose.Promise = global.Promise;

const CONFIG = config.mongodb.xcb;

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

import * as coupon from './schema/coupon';

client.model('Coupon', coupon.CouponSchema, 'coupon');

export {client, mongoose};