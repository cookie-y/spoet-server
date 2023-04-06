'use strict';

module.exports = app => {
  const Account = app.model.define('account', require('../schema/account')(app));
  const SearchRecord = app.model.define('searchRecord', require('../schema/searchRecord')(app));

  // 关系
  SearchRecord.belongsTo(Account, { foreignKey: 'accountId', targetKey: 'accountId' }); // 一条搜索记录属于一个账号

  return SearchRecord;
};
