'use strict';


module.exports = app => {
  const Member = app.model.define('member', require('../schema/member')(app), { paranoid: true });
  const Account = app.model.define('account', require('../schema/account')(app));
  const ParticipateRecord = app.model.define('participateRecord', require('../schema/participateRecord')(app));

  // 关系
  Member.belongsTo(Account, { foreignKey: 'facultyId', as: 'account', targetKey: 'accountId' }); // 一个学生属于一个账号
  Member.hasMany(ParticipateRecord, { foreignKey: 'studentId', targetKey: 'studentId' }); // 一个学生可参加多个比赛

  // 查询分组
  Member.list = async (where, limit, offset) => {
    const [ list, total ] = await Promise.all([ Member.findAll({ where, limit, offset }), Member.count() ]);
    return { list, total };
  };

  // 新增队员
  Member.add = async member => {
    return await Member.create(member);
  };

  // 删除队员
  Member.del = async query => {
    return await Member.destroy({ where: query });
  };

  return Member;
};
