'use strict';

module.exports = ctl => ({
  post: {
    // 新增赛程
    '/addOrUpdateScheduleList': ctl.volleyballScore.addOrUpdateSchedule,
    // 根据ID修改赛程
    '/editScheduleById': ctl.volleyballScore.editScheduleById,
    // 删除赛程
    '/delSchedule': ctl.volleyballScore.delSchedule,
    // 录入比赛成绩
    '/enterScore': ctl.volleyballScore.enterScore,
  },
  get: {
    // 获取赛程安排列表
    '/getScheduleList': ctl.volleyballScore.getScheduleList,
    // 获取指定日期的赛程安排列表
    '/getScheduleDetail': ctl.volleyballScore.getScheduleDetail,
    // 获取有赛程安排的日期列表
    '/getScheduleDateList': ctl.volleyballScore.getScheduleDateList,
  },
});
