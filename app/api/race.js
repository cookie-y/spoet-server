'use strict';

module.exports = ctl => ({
  post: {
    // 新增比赛
    '/addRace': ctl.race.addRace,
  },
  get: {
    // 获取比赛列表
    '/getRaceList': ctl.race.getRaceList,
    // 获取比赛列表
    '/getMyHostRaceList': ctl.race.getMyHostRaceList,
    // 获取比赛详情
    '/getRaceDetail': ctl.race.getRaceDetail,
  },
});
