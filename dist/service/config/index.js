'use strict';

/**
 * @author synder
 * @date 16/1/10
 * @desc
 */

var NODE_ENV = process.env.NODE_ENV.toLowerCase();
var CONFIG = require('./' + NODE_ENV);

module.exports = CONFIG;