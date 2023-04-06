'use strict';
const initRouterMap = require('./utils/initRouterMap');


/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { controller, config } = app;

  const { prefix } = config.userConfig;

  initRouterMap(prefix, require('./api/auth')(controller), app);

  initRouterMap(prefix, require('./api/account')(controller), app);

};
