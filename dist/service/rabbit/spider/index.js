'use strict';

/**
 * @author synder on 2017/2/27
 * @copyright
 * @desc
 */

var url = require('url');

var queues = require('./queue/url');
var Connection = require('../lib/index').Connection;
var config = require('../../config');

if (!config && !config.amqp && config.amqp.ifibbs) {
  throw new Error('please provide amqp config');
}

var IFIBBS_CONFIG = config.amqp.ifibbs;

var IFIBBS_CLIENT = new Connection(IFIBBS_CONFIG.host, IFIBBS_CONFIG.port, IFIBBS_CONFIG.user, IFIBBS_CONFIG.pass);

exports.client = IFIBBS_CLIENT;
exports.queues = queues;