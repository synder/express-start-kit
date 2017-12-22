'use strict';

/**
 * @author synder on 2017/3/3
 * @copyright
 * @desc
 */

var Sequelize = require('sequelize');

var config = require('../../config');

if (!config && !config.mysql && config.mysql.user && config.mysql.ifibbs) {
    throw new Error('please provide mongodb config');
}

var IFIBBS_CONFIG = config.mysql.ifibbs;

var IFIBBS_CLIENT = new Sequelize(IFIBBS_CONFIG.database, IFIBBS_CONFIG.username, IFIBBS_CONFIG.password, {
    host: IFIBBS_CONFIG.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

var user = require('./schema/user');

exports.client = user.define(IFIBBS_CLIENT);

exports.init = function () {
    if (process.env.INIT_MYSQL === 'yes') {
        IFIBBS_CLIENT.sync({ force: true }).then(function (err) {
            if (err) {
                return console.error(err);
            }

            console.log('init mysql success');
        });
    }
};