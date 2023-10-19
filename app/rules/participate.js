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

// 获取比赛参赛队列表接口参数校验
const getParticipateTeamListRule = {
  // 比赛id
  raceId: {
    type: 'stringNumber',
    require: true,
  },
};

// 获取比赛参赛队伍的参赛队员列表接口参数校验
const getTeamParticipantListRule = {
  // 比赛id
  raceId: {
    type: 'stringNumber',
    require: true,
  },
  // 队伍id
  teamId: {
    type: 'stringNumber',
    require: true,
  },
};


module.exports = {
  addParticipantRule,
  getParticipateTeamListRule,
  getTeamParticipantListRule,
};
