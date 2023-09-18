'use strict';

module.exports = app => {
  const ParticipateMember = app.model.define('account', require('../schema/participateMember')(app));
  const ParticipateRecord = app.model.define('participateRecord', require('../schema/participateRecord')(app));
  const Member = app.model.define('member', require('../schema/member')(app));

  // 关系
  ParticipateMember.belongsTo(ParticipateRecord);
  ParticipateMember.belongsTo(Member);

  return ParticipateRecord;
};
