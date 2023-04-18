'use strict';
const customRules = require('./app/rules/customRules');

module.exports = app => {
  customRules(app);
};
