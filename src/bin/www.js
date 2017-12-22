/**
 * @author synder on 2017/2/20
 * @copyright
 * @desc
 */

import app from '../app';

const config = global.config;

app.listen(config.port, function () {
  console.log('server listen on port ' + config.port);
});