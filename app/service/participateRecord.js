'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

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
      order: [[ 'group' ]],
    };
    const list = await ctx.model.ParticipateRecord.list(filter);
    return list;
  }

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
          through: {
            attributes: [],
          },
        },
      ],
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
   * 自动分组
   * @param {Int} raceId 比赛id
   * @param {Int} groupNum 分组组数
   * @param {IntArray} special 特殊处理账号
   * @return 分组情况数组
   */
  async automaticGrouping(raceId, groupNum, special) {
    const { ctx } = this;
    // 获取参赛名单
    const participateAccounts = await ctx.model.ParticipateRecord.list(+raceId);

    // 每组名额
    const maxSum = _.ceil(participateAccounts.length / groupNum);
    const result = new Array(groupNum);

    // 特殊处理
    special.forEach(async (value, index) => {
      result[index] = [ +value ];
      await this.updateGroup(raceId, value, index);
    });

    // 分组数据处理
    participateAccounts.forEach(async value => {
      if (!special.includes(String(value.accountId))) {
        let tem = 0;
        do {
          tem = _.random(groupNum - 1);
        } while (result[tem].length >= maxSum);
        result[tem].push(value.accountId);
        await this.updateGroup(raceId, value.accountId, tem);
      }
    });
  }

  // 更新参赛分组
  async updateGroup(raceId, accountId, index) {
    const { ctx } = this;
    const data = { group: String.fromCharCode(65 + index) };
    const filter = { raceId, accountId };
    const result = await ctx.model.ParticipateRecord.edit(data, filter);
    return result;
  }
}

module.exports = ParticipateService;
