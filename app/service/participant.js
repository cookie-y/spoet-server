'use strict';

const Service = require('egg').Service;

class ParticipateService extends Service {
  /**
   * 获取某个比赛某个队伍的参赛队员
   *
   * @param {*} where 筛选条件
   * @return {*} 参赛队员列表
   * @memberof ParticipateService
   */
  async getTeamParticipantList(where) {
    const { ctx } = this;
    const filter = {
      attributes: { exclude: [ 'createdAt', 'updatedAt', 'deletedAt' ] },
      where,
      include: [
        {
          model: ctx.model.Member,
          attributes: { exclude: [ 'createdAt', 'updatedAt', 'deletedAt' ] },
        },
      ],
    };
    const list = await ctx.model.Participant.list(filter);
    return list;
  }

  /**
   * 新增参赛队员
   *
   * @param {number} participateId 参加队伍记录id
   * @param {string} studentIds 参加者学号字符串
   * @return {number} 参赛记录id
   * @memberof ParticipateService
   */
  async addParticipants(participateId, studentIds) {
    const { ctx } = this;
    const list = studentIds.split(',');
    list.forEach(async item => {
      await ctx.model.Participant.add({ studentId: item, participateId });
    });
  }
}

module.exports = ParticipateService;
