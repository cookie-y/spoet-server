'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class RaceService extends Service {

  // 获取比赛列表
  async getRaceList(race) {
    const { ctx } = this;
    const { page, pageSize, keyword, ...query } = race;
    const where = { ...query };
    if (keyword) {
      where.raceName = { [Op.substring]: keyword };
    }

    const filter = {
      where,
      limit: +pageSize,
      offset: (page - 1) * pageSize,
      include: 'organize',
    };

    const result = await ctx.model.Race.list(filter);
    return result;
  }

  // 获取我举办的比赛列表
  async getMyHostRaceList(race) {
    const { ctx } = this;
    const { page, pageSize, ...query } = race;

    const filter = {
      where: { ...query },
      limit: +pageSize,
      offset: (page - 1) * pageSize,
      include: 'organize',
    };

    const result = await ctx.model.Race.list(filter);
    return result;
  }

  // 获取我参加的比赛列表
  async getMyAttendList(accountId, page, size) {
    const { ctx } = this;
    const filter = {
      include: {
        model: ctx.model.ParticipateRecord,
        as: 'participates',
        where: {
          accountId,
        },
      },
      order: [
        [ 'applyStart', 'DESC' ],
      ],
      limit: +size,
      offset: +size * (+page - 1),
    };
    const result = await ctx.model.Race.getListPaginated(filter);
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
    const [ annex, racePoster, venueImgs ] = await Promise.all([
      ctx.service.storage.uploadFile('race', race.annex),
      ctx.service.storage.uploadFile('race', race.racePoster),
      ctx.service.storage.uploadFile('race', race.venueImgs),
    ]);
    const result = await ctx.model.Race.add({ ...race, annex, racePoster, venueImgs });
    return result;
  }

  // 更新比赛信息
  editRace() {}

}

module.exports = RaceService;
