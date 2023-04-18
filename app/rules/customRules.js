'use strict';

module.exports = app => {
  app.validator.addRule('stringNumber', (rule, value) => {
    if (typeof +value !== 'number' || value % 1 !== 0) {
      return '应该为数值';
    }
    if (rule.hasOwnProperty('max') && +value > rule.max) {
      return `should smaller than ${rule.max}`;
    }
  });
};
