'use strict';

module.exports = app => {
  const Account = app.model.define('account', require('../schema/account')(app));
  const Race = app.model.define('race', require('../schema/race')(app));
  const Point = app.model.define('point', require('../schema/point')(app));

  // 关系
  Point.belongsTo(Account, { foreignKey: 'accountId', as: 'account', targetKey: 'accountId' }); // 一个积分记录对应一个比赛信息
  Point.belongsTo(Race, { foreignKey: 'raceId', as: 'race', targetKey: 'raceId' }); // 一个消息只关联一个比赛

  return Point;
};
