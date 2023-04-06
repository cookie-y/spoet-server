'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

class ParticipateService extends Service {
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
    const participateAccounts = await ctx.model.ParticipateRecord.getParticipateAccountList(+raceId);

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
    const result = await ctx.model.ParticipateRecord.updateData(data, filter);
    return result;
  }
}

module.exports = ParticipateService;
