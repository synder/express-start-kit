/**
 * @author cyb
 * @copyright cyb.com
 * @desc
 */

import {Schema} from 'mongoose';

const {ObjectId} = Schema.Types;

const CouponSchema = new Schema({
  status: {type: Number, required: true},
  app_name: {type: String, required: true},
  app_key: {type: String, required: true},
  app_secret: {type: String, required: true},
  create_time: {type: Date, required: true},
  update_time: {type: Date, required: true},
});

export {CouponSchema};