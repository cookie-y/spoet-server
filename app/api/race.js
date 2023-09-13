'use strict';

module.exports = ctl => ({
  post: {
    // 新增比赛
    '/addRace': ctl.race.addRace,
    // 编辑比赛基本信息
    '/editRace': ctl.race.editRace,
  },
  get: {
    // 获取比赛列表
    '/getRaceList': ctl.race.getRaceList,
  },
});
