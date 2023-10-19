// 参赛
'use strict';

module.exports = ctl => ({
  post: {
    // 参加比赛
    '/addParticipants': ctl.participate.addParticipants,
  },
  get: {
    // 获取比赛的所有参赛队伍
    '/getParticipateTeamList': ctl.participate.getParticipateTeamList,
    // 获取某个比赛某个队伍的参赛队员
    '/getTeamParticipantList': ctl.participate.getTeamParticipantList,
  },
});
