'use strict';

const debug = require('debug')('app:passport');

module.exports = {
  async verify(ctx, account) {
    debug('use ' + account.provider);
    return require(`./${account.provider}`)(ctx, account);
  },
};
