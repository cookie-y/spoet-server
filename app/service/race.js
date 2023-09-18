'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class RaceService extends Service {

  // 获取比赛列表
  async getRaceList(filter) {
    const { ctx } = this;

    const result = await ctx.model.Race.list(filter);
    return result;
  }

  // 获取我举办的比赛列表
  async getMyHostRaceList(filter) {
    const { ctx } = this;

    const result = await ctx.model.Race.list(filter);
    return result;
  }

  // 获取我参加的比赛列表
  async getMyAttendList(filter) {
    const { ctx } = this;
    const result = await ctx.service.participateRecord.getRaceListOfAccount(filter);
    return result;
  }

  // 获取比赛详情
  async getDetail(raceId) {
    const { ctx } = this;
    const filter = {
      where: { raceId },
      include: 'organize',
    };
    const result = await ctx.model.Race.detail(filter);
    return result;
  }

  // 获取热搜列表
  async getRecommendRace() {
    const { ctx } = this;
    const filter = {
      include: [{
        model: ctx.model.Account,
        as: 'participates',
        through: {
          attributes: [],
        },
      }],
      where: {
        state: {
          [Op.ne]: 0,
        },
      },
      order: [
        [ 'pv', 'DESC' ],
      ],
      limit: 10,
    };
    const result = await ctx.model.Race.list(filter);
    return result;
  }

  // 新增比赛
  async addRace(race) {
    const { ctx } = this;
    const result = await ctx.model.Race.add(race);
    return result;
  }

  // 更新比赛信息
  async editRace(race) {
    const { ctx } = this;
    const { raceId, ...others } = race;
    const result = await ctx.model.Race.edit(others, { raceId });
    return result;
  }

  // 删除比赛
  async delRace(raceId) {
    const { ctx } = this;
    const result = await ctx.model.Race.del({ raceId });
    return result;
  }

}

module.exports = RaceService;
