'use strict';

module.exports = ctl => ({
  post: {
    // 新增比赛
    '/addRace': ctl.race.addRace,
  },
  get: {
    // 获取比赛列表
    '/getRaceList': ctl.race.getRaceList,
  },
});
