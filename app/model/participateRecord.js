'use strict';

module.exports = app => {
  const ParticipateRecord = app.model.define('participateRecord', require('../schema/participateRecord')(app));
  const Account = app.model.define('account', require('../schema/account')(app));
  const Race = app.model.define('race', require('../schema/race')(app));
  const TeamMember = app.model.define('teamMember', require('../schema/member')(app));

  // 关系
  ParticipateRecord.belongsTo(Race, { foreignKey: 'raceId', as: 'participates', targetKey: 'raceId' }); // 一场比赛有多条参赛记录
  ParticipateRecord.belongsTo(Account, { foreignKey: 'accountId', targetKey: 'accountId' }); // 一条参赛记录有一个账号信息
  ParticipateRecord.belongsTo(TeamMember, { foreignKey: 'studentId', targetKey: 'studentId' }); // 一条参赛记录有一个学生信息

  /**
   * * 获取参赛组织列表
   */
  ParticipateRecord.getParticipateAccountList = async raceId => {
    return await ParticipateRecord.findAll({
      attributes: [ 'accountId' ],
      where: { raceId },
      group: 'accountId',
    });
  };

  /**
   * * 更新参赛数据
   */
  ParticipateRecord.updateData = async (data, filter) => {
    console.log(data, filter);
    return await ParticipateRecord.update(data, {
      where: filter,
    });
  };

  return ParticipateRecord;
};
