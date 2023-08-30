'use strict';

module.exports = app => {
  const Account = app.model.define('account', require('../schema/account')(app));
  const School = app.model.define('school', require('../schema/school')(app));

  // 关系
  School.hasMany(Account, { foreignKey: 'schoolId', targetKey: 'schoolId' }); // 一个学校包含个账号

  // 查询列表
  School.list = async param => {
    const list = await School.findAll(param);
    return list;
  };

  return School;
};
