'use strict';

module.exports = app => {
  const ParticipateRecord = app.model.define('participateRecord', require('../schema/participateRecord')(app));
  const ParticipateMember = app.model.define('account', require('../schema/participateMember')(app));
  const Account = app.model.define('account', require('../schema/account')(app));
  const Member = app.model.define('member', require('../schema/member')(app), { paranoid: true });
  const Race = app.model.define('race', require('../schema/race')(app));

  // 关系
  ParticipateRecord.belongsTo(Race, { foreignKey: 'raceId' });
  ParticipateRecord.belongsTo(Account, { as: 'ParticipateTeam', foreignKey: 'accountId' });
  ParticipateRecord.hasMany(Member);
  ParticipateRecord.belongsToMany(Member, { through: ParticipateMember, foreignKey: 'participateId', otherKey: 'studentId' }); // 一场比赛有多条参赛记录

  // 获取参赛列表
  ParticipateRecord.list = async filter => {
    const { rows, count } = await ParticipateRecord.findAndCountAll(filter);
    return { list: rows, total: count };
  };

  // 更新参赛列表
  ParticipateRecord.edit = async (data, filter) => {
    console.log(data, filter);
    return await ParticipateRecord.update(data, {
      where: filter,
    });
  };

  return ParticipateRecord;
};
