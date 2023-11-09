'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class ParticipateService extends Service {
  /**
   * 获取比赛的参赛队伍列表
   *
   * @param {*} raceId 查询的比赛id
   * @memberof ParticipateService
   */
  async getParticipateTeamList(raceId) {
    const { ctx } = this;
    const filter = {
      attributes: { exclude: [ 'createdAt', 'updatedAt', 'deletedAt' ] },
      where: { raceId },
      include: [
        {
          model: ctx.model.Account,
          attributes: { exclude: [ 'createdAt', 'updatedAt', 'deletedAt' ] },
          as: 'participateTeam',
        },
      ],
      order: [[ 'integral', 'DESC' ]],
    };
    const list = await ctx.model.ParticipateRecord.list(filter);
    return list;
  }

  /**
   * 获取账号参加的比赛列表
   *
   * @param {*} filter 过滤条件
   * @memberof ParticipateService
   */
  async getRaceListOfAccount(filter) {
    const { ctx } = this;
    const list = await ctx.model.ParticipateRecord.list(filter);
    return list;
  }

  /**
   * 新增参赛队伍
   *
   * @param {number} raceId 参加的比赛id
   * @param {number} accountId 参加队伍id
   * @return {number} 参赛记录id
   * @memberof ParticipateService
   */
  async addParticipatingTeam(raceId, accountId) {
    const { ctx } = this;
    const result = await ctx.model.ParticipateRecord.add({ raceId, accountId });
    return result.id;
  }

  /**
   * 编辑分组信息
   *
   * @param {*} raceId 比赛id
   * @param {*} list 修改账号id列表
   * @memberof ParticipateService
   */
  async editGroupInf(raceId, list) {
    const { ctx } = this;
    list.forEach(async (value, index) => {
      const data = { group: String.fromCharCode(index + 65) };
      const filter = { raceId, accountId: { [Op.in]: value } };
      await ctx.model.ParticipateRecord.edit(data, filter);
    });
  }
}

module.exports = ParticipateService;
