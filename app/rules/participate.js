'use strict';

// 新增比赛报名者接口参数校验
const addParticipantRule = {
  // 参加者id字符串
  participants: {
    type: 'string',
    required: true,
  },
  // 参加的比赛id
  raceId: {
    type: 'int',
    require: true,
  },
};


module.exports = {
  addParticipantRule,
};
