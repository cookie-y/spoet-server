'use strict';


module.exports = app => {
  const Member = app.model.define('member', require('../schema/member')(app), { paranoid: true });
  const Account = app.model.define('account', require('../schema/account')(app));
  const ParticipateRecord = app.model.define('participateRecord', require('../schema/participateRecord')(app));
  const Participant = app.model.define('participant', require('../schema/participant')(app));

  // 关系
  Member.belongsTo(Account, { as: 'team', foreignKey: 'facultyId', targetKey: 'accountId' }); // 一个学生属于一个账号
  Member.hasMany(ParticipateRecord, { foreignKey: 'studentId', targetKey: 'studentId' }); // 一个学生可参加多个比赛
  Member.belongsToMany(ParticipateRecord, { through: Participant, foreignKey: 'studentId', otherKey: 'participateId' }); // 一个账号可参加多个比赛

  // 查询列表
  Member.list = async (where, limit, offset) => {
    const { rows, count } = await Member.findAndCountAll({ where, limit, offset });
    return { list: rows, total: count };
  };

  // 查询详情
  Member.detail = async where => {
    console.log(await Member.findOne({ where }), where);
    return await Member.findOne({ where });
  };

  // 新增队员
  Member.add = async member => {
    const result = await Member.findByPk(member.studentId);
    if (!result) {
      return await Member.create(member);
    }
  };

  // 编辑队员
  Member.edit = async (member, where) => {
    return await Member.update(member, { where });
  };

  // 删除队员
  Member.del = async where => {
    return await Member.destroy({ where });
  };

  return Member;
};
