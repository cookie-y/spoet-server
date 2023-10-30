'use strict';
const Service = require('egg').Service;

class VolleyballScoreService extends Service {
  /**
   * 获取指定日期的赛程安排
   *
   * @param {number} raceId 比赛id
   * @param {string} date 日期
   * @return {object[]} 赛程列表
   * @memberof VolleyballScoreService
   */
  async getScoreListByDate(raceId, date) {
    const { ctx } = this;
    const param = {
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      where: { raceId, date },
      include: [
        {
          model: ctx.model.ParticipateRecord,
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
          as: 'A',
          include: {
            model: ctx.model.Account,
            attributes: { exclude: [ 'createdAt', 'updatedAt', 'deletedAt' ] },
            as: 'participateTeam',
          },
        },
        {
          model: ctx.model.ParticipateRecord,
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
          as: 'B',
          include: {
            model: ctx.model.Account,
            attributes: { exclude: [ 'createdAt', 'updatedAt', 'deletedAt' ] },
            as: 'participateTeam',
          },
        },
      ],
    };
    const list = await ctx.model.VolleyballScore.list(param);
    return list;
  }

  /**
   * 新增赛程
   *
   * @param {*} scheduleList 赛程列表
   * @memberof VolleyballScoreService
   */
  async addSchedule(scheduleList) {
    const { ctx } = this;
    await ctx.model.VolleyballScore.add(scheduleList);
  }
}

module.exports = VolleyballScoreService;
