'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _xpress = require('./lib/xpress');

var xpress = _interopRequireWildcard(_xpress);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _bodyParser = require('body-parser');

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _connectTimeout = require('connect-timeout');

var _connectTimeout2 = _interopRequireDefault(_connectTimeout);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _user = require('./router/user');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

xpress.extend(); /**
                  * @author synder
                  * @date 16/1/10
                  * @desc create http server
                  */

global.config = _config2.default;

var app = (0, _express2.default)();

app.set('x-powered-by', false);
app.set('trust proxy', true);

app.use((0, _compression2.default)());
app.use((0, _connectTimeout2.default)('20s'));
app.use((0, _cookieParser2.default)());
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));

app.use(_user.userRouter);

exports.default = app;