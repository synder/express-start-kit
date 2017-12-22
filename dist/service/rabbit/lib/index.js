'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author synder on 2017/2/13
 * @copyright
 * @desc
 */

var url = require('url');
var util = require('util');
var amqp = require('amqplib/callback_api');

/**
 * Creates Connection.
 * @class Connection
 */

var Connection = function () {
    function Connection(host, port, user, pass) {
        (0, _classCallCheck3.default)(this, Connection);


        this._consumeConn = null;
        this._consumeChan = null;

        this._produceConn = null;
        this._produceChan = null;

        var auth = user ? user + ':' + pass : null;

        this.__CONN_STR = url.format({
            protocol: 'amqp',
            hostname: host,
            port: port,
            auth: auth
        });

        this.__connect(true, function (err) {
            if (err) {
                console.error(err.stack);
            }
        });
    }

    //链接服务器，并创建channel


    (0, _createClass3.default)(Connection, [{
        key: '__connect',
        value: function __connect(produce, callback) {

            var self = this;

            if (produce === true) {
                if (self._produceChan && self._produceConn) {
                    return callback(null, self._produceChan);
                }

                if (self._produceConn) {
                    return self._produceConn.createChannel(function (err, ch) {
                        if (err) {
                            return callback(err);
                        }

                        self._produceChan = ch;

                        callback(null, self._produceChan);
                    });
                }

                amqp.connect(self.__CONN_STR, function (err, conn) {
                    if (err) {
                        return callback && callback(err);
                    }

                    conn.on('error', function (err) {
                        self._produceChan = null;
                        self._produceConn = null;
                    });

                    conn.on('close', function () {
                        self._produceChan = null;
                        self._produceConn = null;
                    });

                    conn.createChannel(function (err, ch) {
                        if (err) {
                            return callback(err);
                        }

                        self._produceConn = conn;
                        self._produceChan = ch;

                        return callback(null, self._produceChan);
                    });
                });
            } else {
                if (self._consumeConn && self._consumeChan) {
                    return callback(null, self._consumeChan);
                }

                if (self._consumeConn) {
                    return self._consumeConn.createChannel(function (err, ch) {
                        if (err) {
                            return callback(err);
                        }

                        self._consumeChan = ch;

                        return callback(null, self._consumeChan);
                    });
                }

                amqp.connect(self.__CONN_STR, function (err, conn) {
                    if (err) {
                        return callback && callback(err);
                    }

                    conn.on('error', function (err) {
                        self._consumeChan = null;
                        self._consumeConn = null;
                    });

                    conn.on('close', function () {
                        self._consumeChan = null;
                        self._consumeConn = null;
                    });

                    conn.createChannel(function (err, ch) {
                        if (err) {
                            return callback(err);
                        }

                        self._consumeChan = ch;
                        self._consumeConn = conn;

                        return callback(null, self._consumeChan);
                    });
                });
            }
        }
    }, {
        key: 'produceMessage',


        /**
         * @desc 生产消息
         * */
        value: function produceMessage(queue, message, callback) {
            var self = this;
            var sendMsg = void 0;

            if (typeof message === 'string') {
                sendMsg = new Buffer(message);
            } else if (Buffer.isBuffer(message)) {
                sendMsg = message;
            } else {
                sendMsg = new Buffer(message.toString ? message.toString() : (0, _stringify2.default)(message));
            }

            self.__connect(true, function (err, ch) {

                if (err) {
                    return callback(err);
                }

                if (!ch) {
                    return callback(new Error('can not create produce channel'));
                }

                ch.assertQueue(queue);
                ch.sendToQueue(queue, sendMsg);

                callback(null, ch);
            });
        }
    }, {
        key: 'consumeMessage',


        /**
         * @desc 发布消息
         * */
        value: function consumeMessage(queue, callback) {

            var self = this;

            self.__connect(false, function (err, ch) {

                if (err) {
                    return callback(err);
                }

                if (!ch) {
                    return callback(new Error('can not create consume channel'));
                }

                ch.assertQueue(queue);

                ch.consume(queue, function (msg) {
                    callback(null, ch, msg);
                });
            });
        }
    }]);
    return Connection;
}();

exports.Connection = Connection;