/**
 * Created by on 2017/6/19.
 */

import {Schema} from 'mongoose';

const {ObjectId} = Schema.Types;

const VehicleSchema = new Schema({
  status: {type: Number, required: true},
  title: {type: String, required: false},
  list: {type: Array, required: true},
  platform: {type: String, required: true},
  create_time: {type: Date, required: true},
  update_time: {type: Date, required: true},
});


export {VehicleSchema};