'use strict';

module.exports = app => {
  const ParticipateRecord = app.model.define('participateRecord', require('../schema/participateRecord')(app));
  const VolleyballScore = app.model.define('volleyballScore', require('../schema/volleyballScore')(app));
  const Participant = app.model.define('participant', require('../schema/participant')(app));
  const Account = app.model.define('account', require('../schema/account')(app));
  const Member = app.model.define('member', require('../schema/member')(app));
  const Race = app.model.define('race', require('../schema/race')(app));

  // 关系
  ParticipateRecord.belongsTo(Race, { foreignKey: 'raceId' });
  ParticipateRecord.belongsTo(Account, { as: 'participateTeam', foreignKey: 'accountId' });
  ParticipateRecord.hasMany(Member);
  ParticipateRecord.belongsToMany(Member, { through: Participant, foreignKey: 'participateId', otherKey: 'studentId' }); // 一场比赛有多条参赛记录
  ParticipateRecord.hasMany(VolleyballScore, { as: 'A', foreignKey: 'id', targetKey: 'adversaryA' }); // 一个参赛队伍会有多个比赛成绩
  ParticipateRecord.hasMany(VolleyballScore, { as: 'B', foreignKey: 'id', targetKey: 'adversaryB' }); // 一个参赛队伍会有多个比赛成绩

  // 获取参赛列表
  ParticipateRecord.list = async filter => {
    const { rows, count } = await ParticipateRecord.findAndCountAll(filter);
    return { list: rows, total: count };
  };

  // 更新参赛列表
  ParticipateRecord.edit = async (data, filter) => {
    return await ParticipateRecord.update(data, {
      where: filter,
    });
  };

  // 新增参赛队伍
  ParticipateRecord.add = async data => {
    return await ParticipateRecord.create(data);
  };

  return ParticipateRecord;
};
