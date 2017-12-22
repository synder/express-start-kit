/**
 * @author synder
 * @date 16/1/10
 * @desc
 */

const NODE_ENV = process.env.NODE_ENV.toLowerCase();
const CONFIG = require('./' + NODE_ENV);

module.exports = CONFIG;