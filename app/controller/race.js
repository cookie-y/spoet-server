'use strict';
const Controller = require('../core/base_controller');
const rules = require('../rules/race');
const { Op } = require('sequelize');

/**
 * * 安全
 */
class RaceController extends Controller {
  // 获取比赛列表
  async getRaceList() {
    const { ctx } = this;
    await ctx.validate(rules.raceListRule, ctx.query);
    const { page = 1, pageSize = 10, type, keyword, ...query } = ctx.request.query;
    let filter = {
      limit: +pageSize,
      offset: (page - 1) * pageSize,
    };
    let list = [];
    if (type === 'host') {
      // 我举办的
      filter.where = { organizer: ctx.user.accountId };
      list = await ctx.service.race.getMyHostRaceList(filter);
    } else if (type === 'attend') {
      // 我参加的
      filter = {
        ...filter,
        include: 'race',
        attributes: [ 'raceId' ],
        order: [[ 'race', 'applyStart', 'DESC' ]],
        where: { accountId: ctx.user.accountId },
      };
      list = await ctx.service.race.getMyAttendList(filter);
    } else if (type === 'recommend') {
      list = await ctx.service.race.getHotList(filter);
    } else {
      filter.where = { ...query };
      if (keyword) {
        filter.where.raceName = { [Op.substring]: keyword };
      }
      list = await ctx.service.race.getRaceList(filter);
    }
    this.success(list);
  }

  // 获取比赛详情
  async getRaceDetail() {
    const { ctx } = this;
    const { query } = ctx.request;
    try {
      ctx.validate(rules.raceDetailRule, query);

      const race = await ctx.service.race.getDetail(query.raceId);
      this.success(race);
    } catch (error) {
      this.fail(error);
    }
  }

  // 新增比赛
  async addRace() {
    const { ctx } = this;

    // 校验
    ctx.validate(rules.addRaceRule);

    const race = {
      ...ctx.request.body,
      organizer: ctx.user.accountId,
    };

    await ctx.service.race.addRace(race);

    this.success();

  }

  // 编辑比赛信息
  async editRace() {
    const { ctx } = this;

    // 校验
    try {
      await ctx.service.race.editRace();

      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  // 删除比赛
  async delete() {
    const { ctx } = this;

    await ctx.service.security.logout();

    this.success();

  }

  async automaticGrouping() {
    const { ctx } = this;
    const { raceId, groupNum, special } = ctx.request.body;
    await ctx.service.participate.automaticGrouping(+raceId, +groupNum, special.split(','));
    this.success();
  }
}


module.exports = RaceController;
