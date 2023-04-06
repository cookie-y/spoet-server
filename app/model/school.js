'use strict';

module.exports = app => {
  const Account = app.model.define('account', require('../schema/account')(app));
  const School = app.model.define('school', require('../schema/school')(app));

  // 关系
  School.hasMany(Account, { foreignKey: 'schoolId', targetKey: 'schoolId' }); // 一个账号可接收多条信息

  return School;
};
