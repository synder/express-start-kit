/**
 * @author synder on 2017/2/17
 * @copyright
 * @desc
 */


import {Schema} from 'mongoose';

const {ObjectId} = Schema.Types;

const CustomerSchema = new Schema({
  status: {type: Number, required: true},
  app_name: {type: String, required: true},
  app_key: {type: String, required: true},
  app_secret: {type: String, required: true},
  create_time: {type: Date, required: true},
  update_time: {type: Date, required: true},
});

export {CustomerSchema};
