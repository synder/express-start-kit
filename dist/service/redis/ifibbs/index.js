'use strict';

/**
 * @author synder on 2017/2/18
 * @copyright
 * @desc
 */

var redis = require('redis');

var config = require('../../config');

if (!config && !config.redis && config.redis.ifibbs) {
    throw new Error('please provide mongodb config');
}

var IFIBBS_CONFIG = config.redis.ifibbs;

var REDIS_CONFIG = {
    host: IFIBBS_CONFIG.host,
    port: IFIBBS_CONFIG.port || 6379,
    db: IFIBBS_CONFIG.db || 0
};

if (IFIBBS_CONFIG.password) {
    REDIS_CONFIG.password = IFIBBS_CONFIG.password;
}

var IFIBBS_CLIENT = redis.createClient(REDIS_CONFIG);

IFIBBS_CLIENT.on('error', function (err) {
    console.error(err.stack);
});

exports.client = IFIBBS_CLIENT;