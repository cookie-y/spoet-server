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
    const result = await ctx.service.participate.getRaceListOfAccount(filter);
    return result;
  }

  // 获取比赛详情
  async getDetail(raceId) {
    const { ctx } = this;
    const filter = {
      where: { raceId },
      include: [ 'organize', 'participates' ],
    };
    const result = await ctx.model.Race.detail(filter);
    return result;
  }

  // 获取热搜列表
  async getHotList() {
    const { ctx } = this;
    const filter = {
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
    const result = await ctx.model.Race.getList(filter);
    return result;
  }

  // 新增比赛
  async addRace(race) {
    const { ctx } = this;
    const result = await ctx.model.Race.add(race);
    return result;
  }

  // 更新比赛信息
  editRace() {}

}

module.exports = RaceService;
