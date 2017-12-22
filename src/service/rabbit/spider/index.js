/**
 * @author synder on 2017/2/27
 * @copyright
 * @desc
 */

const url = require('url');

const queues = require('./queue/url');
const Connection = require('../lib/index').Connection;
const config = require('../../config');

if(!config && !config.amqp && config.amqp.ifibbs){
    throw new Error('please provide amqp config');
}

const IFIBBS_CONFIG = config.amqp.ifibbs;

const IFIBBS_CLIENT = new Connection(IFIBBS_CONFIG.host, IFIBBS_CONFIG.port, IFIBBS_CONFIG.user, IFIBBS_CONFIG.pass);

exports.client = IFIBBS_CLIENT;
exports.queues = queues;