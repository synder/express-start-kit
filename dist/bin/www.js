'use strict';

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = global.config; /**
                             * @author synder on 2017/2/20
                             * @copyright
                             * @desc
                             */

_app2.default.listen(config.port, function () {
  console.log('server listen on port ' + config.port);
});