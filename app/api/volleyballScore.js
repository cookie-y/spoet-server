'use strict';

module.exports = ctl => ({
  post: {
    // 新增赛程
    '/addSchedule': ctl.volleyballScore.addSchedule,
  },
  get: {
    // 获取指定日期的赛程安排列表
    '/getScheduleListByDate': ctl.volleyballScore.getScoreList,
  },
});
