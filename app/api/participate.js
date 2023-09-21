// 参赛
'use strict';

module.exports = ctl => ({
  post: {
    // 参加比赛
    '/addParticipants': ctl.participate.addParticipants,
  },
});
