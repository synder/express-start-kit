/***
 * @time
 * */

import http from 'http';
import {Route} from 'express';

export function extend() {

  http.METHODS.concat('all').forEach(function (method) {

    method = method.toLowerCase();

    let temp = Route.prototype[method];

    Route.prototype[method] = function () {
      let args = [];

      for (let item of arguments) {
        if (Object.prototype.toString.call(item) === '[object AsyncFunction]') {
          args.push(function (req, res, next) {
            item(req, res, next).catch(next);
          });
        } else {
          args.push(item);
        }
      }

      return temp.apply(this, args);
    };

  });
}