'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notFoundErrorHandler = notFoundErrorHandler;
exports.serverErrorHandler = serverErrorHandler;
/**
 * @author synder on 2017/2/23
 * @copyright
 * @desc
 */

function notFoundErrorHandler() {
  return function (req, res, next) {
    next(new NotFoundError(req.method + ':' + req.path));
  };
}

function serverErrorHandler() {
  return function (err, req, res, next) {

    err.code = ~~err.code;

    if (!err.code) {
      err.code = 500;
    }

    if (err.code < 500) {
      logger.error(err.message);
    } else {
      logger.error(err.stack);
    }

    if (!err.message) {
      err.message = 'server error, please try again later';
    }

    res.status(200).json({
      flag: '0' + err.code,
      msg: err.message,
      result: {
        ok: false,
        failed_message: null,
        success_message: null
      }
    });
  };
}