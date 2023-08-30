'use strict';
const initRouterMap = require('./utils/initRouterMap');
const mount = require('./utils/passport').mountPassportToCantroller;
const install = require('./utils/passport').installPassport;

module.exports = app => {
  const { controller, config } = app;

  install(app.passport, require('./passport'));
  mount([ 'local' ], app.passport, controller);

  const { prefix } = config.userConfig;
  initRouterMap(prefix, require('./api/auth')(controller), app);
  initRouterMap(prefix, require('./api/school')(controller), app);
  initRouterMap(prefix, require('./api/account')(controller), app);
  initRouterMap(prefix, require('./api/member')(controller), app);
  initRouterMap(prefix, require('./api/race')(controller), app);

};
