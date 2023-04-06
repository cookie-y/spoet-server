'use strict';

module.exports = app => {
  const Race = app.model.define('race', require('../schema/race')(app));
  const Account = app.model.define('account', require('../schema/account')(app));
  const Point = app.model.define('point', require('../schema/point')(app));
  const Message = app.model.define('message', require('../schema/message')(app));
  const VolleyballScore = app.model.define('volleyballScore', require('../schema/volleyballScore')(app));
  const ParticipateRecord = app.model.define('participateRecord', require('../schema/participateRecord')(app));

  // 关系
  Race.belongsTo(Account, { foreignKey: 'organizer', as: 'organize', targetKey: 'accountId' }); // 一个账号可以举办多场比赛
  Race.hasMany(ParticipateRecord, { foreignKey: 'raceId', as: 'participates', targetKey: 'raceId' }); // 一场比赛有多条参赛记录
  Race.hasMany(Point, { foreignKey: 'raceId', targetKey: 'raceId' }); // 一场比赛有多条积分记录
  Race.hasMany(Message, { foreignKey: 'raceId', targetKey: 'raceId' }); // 一场比赛有多条消息记录
  Race.hasMany(VolleyballScore, { foreignKey: 'raceId', targetKey: 'raceId' }); // 一场比赛有多条比赛结果记录

  /**
   * * 获取比赛信息
   */
  Race.getRace = async filter => {
    return await Race.findOne(filter);
  };

  /**
   * * 获取比赛列表（分页）
   */
  Race.getListPaginated = async filter => {
    return await Race.findAndCountAll(filter);
  };

  /**
   * * 获取比赛列表
   */
  Race.getList = async filter => {
    return await Race.findAll(filter);
  };

  // 新增比赛
  Race.add = async race => {
    return await Race.create(race);
  };

  return Race;
};
