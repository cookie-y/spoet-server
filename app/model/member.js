'use strict';

module.exports = app => {
  const Member = app.model.define('member', require('../schema/member')(app));
  const Account = app.model.define('account', require('../schema/account')(app));
  const ParticipateRecord = app.model.define('participateRecord', require('../schema/participateRecord')(app));

  // 关系
  Member.belongsTo(Account, { foreignKey: 'teamAccountId', as: 'account', targetKey: 'accountId' }); // 一个学生属于一个账号
  Member.hasMany(ParticipateRecord, { foreignKey: 'studentId', targetKey: 'studentId' }); // 一个学生可参加多个比赛

  // 新增比赛
  Member.add = async member => {
    return await Member.create(member);
  };

  return Member;
};
