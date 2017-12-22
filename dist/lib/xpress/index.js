'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.extend = extend;

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***
 * @time
 * */

function extend() {

  _http2.default.METHODS.concat('all').forEach(function (method) {

    method = method.toLowerCase();

    var temp = _express.Route.prototype[method];

    _express.Route.prototype[method] = function () {
      var args = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var item = _step.value;

          if (Object.prototype.toString.call(item) === '[object AsyncFunction]') {
            args.push(function (req, res, next) {
              item(req, res, next).catch(next);
            });
          } else {
            args.push(item);
          }
        };

        for (var _iterator = (0, _getIterator3.default)(arguments), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return temp.apply(this, args);
    };
  });
}