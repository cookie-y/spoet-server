'use strict';

module.exports = app => {
  const Participant = app.model.define('participant', require('../schema/participant')(app));
  const ParticipateRecord = app.model.define('participateRecord', require('../schema/participateRecord')(app));
  const Member = app.model.define('member', require('../schema/member')(app));

  // 关系
  Participant.belongsTo(ParticipateRecord);
  Participant.belongsTo(Member);

  // 新增参赛队员
  Participant.add = async data => {
    console.log('fhuesd', data);
    return await Participant.create(data);
  };

  return Participant;
};
