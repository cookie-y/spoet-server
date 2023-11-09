'use strict';
const Service = require('egg').Service;

class VolleyballScoreService extends Service {
  /**
   * 获取赛程安排列表
   *
   * @param {object} filter 搜索筛选项
   * @return {object[]} 赛程列表
   * @memberof VolleyballScoreService
   */
  async getScheduleList(filter) {
    const { ctx } = this;
    const list = await ctx.model.VolleyballScore.list(filter);
    return list;
  }

  /**
   * 根据ID获取赛程详情
   *
   * @param {object} filter 搜索筛选项
   * @return {*} 赛程信息
   * @memberof VolleyballScoreService
   */
  async getScheduleDetail(filter) {
    const { ctx } = this;
    return await ctx.model.VolleyballScore.detail(filter);
  }

  /**
   * 新增赛程
   *
   * @param {*} scheduleList 赛程列表
   * @memberof VolleyballScoreService
   */
  async addOrUpdateSchedule(scheduleList) {
    const { ctx } = this;
    return await ctx.model.VolleyballScore.bulk(scheduleList);
  }

  /**
   * 根据ID修改赛程
   *
   * @param {*} id 赛程ID
   * @param {*} schedule 赛程数据
   * @return {*} 更新结果
   * @memberof VolleyballScoreService
   */
  async editScheduleById(id, schedule) {
    const { ctx } = this;
    return await ctx.model.VolleyballScore.edit(schedule, { id });
  }

  /**
   * 删除赛程
   *
   * @param {*} id 赛程id
   * @memberof VolleyballScoreService
   */
  async delSchedule(id) {
    const { ctx } = this;
    return await ctx.model.VolleyballScore.del({ id });
  }
}

module.exports = VolleyballScoreService;
