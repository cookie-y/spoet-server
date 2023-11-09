'use strict';

module.exports = app => {
  const Participant = app.model.define('participant', require('../schema/participant')(app));
  const ParticipateRecord = app.model.define('participateRecord', require('../schema/participateRecord')(app));
  const Member = app.model.define('member', require('../schema/member')(app));

  // 关系
  Participant.belongsTo(ParticipateRecord, { foreignKey: 'participateId', targetKey: 'id' });
  Participant.belongsTo(Member, { foreignKey: 'studentId', targetKey: 'studentId' });

  // 获取参赛队员列表
  Participant.list = async filter => {
    return await Participant.findAll(filter);
  };

  // 新增参赛队员
  Participant.add = async data => {
    return await Participant.create(data);
  };

  return Participant;
};
