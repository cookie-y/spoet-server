'use strict';

module.exports = app => {
  const VolleyballScore = app.model.define('volleyballScore', require('../schema/volleyballScore')(app));
  const Account = app.model.define('account', require('../schema/account')(app));
  const Race = app.model.define('race', require('../schema/race')(app));

  // 关系
  VolleyballScore.belongsTo(Race, { foreignKey: 'raceId', as: 'race', targetKey: 'raceId' }); // 一个比赛结果属于一个比赛
  VolleyballScore.belongsTo(Account, { foreignKey: 'adversaryA', targetKey: 'accountId' }); // 一个比赛结果有一个A方
  VolleyballScore.belongsTo(Account, { foreignKey: 'adversaryB', targetKey: 'accountId' }); // 一个比赛结果有一个B方

  return VolleyballScore;
};
