'use strict';

const Service = require('egg').Service;

class ParticipateService extends Service {
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
