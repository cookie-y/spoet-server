'use strict';

module.exports = {
  where(obj, ...args) {
    return Object.assign({ where: { obj }, ...args });
  },
};
