'use strict';
const Controller = require('../core/base_controller');
const rules = require('../rules/race');
const { Op } = require('sequelize');
const { camelCase } = require('lodash');

/**
 * * 安全
 */
class RaceController extends Controller {
  // 获取比赛列表
  async getRaceList() {
    const { ctx, app } = this;
    await ctx.validate(rules.raceListRule, ctx.query);
    const { page = 1, pageSize = 10, type, keyword, ...query } = ctx.request.query;
    let filter = {
      limit: +pageSize,
      offset: (page - 1) * pageSize,
    };
    let list = [];
    if (type === 'host') {
      // 我举办的
      filter = {
        ...filter,
        order: [[ 'applyStart', 'DESC' ]],
        where: { organizer: ctx.user.accountId },
      };
      list = await ctx.service.race.getMyHostRaceList(filter);
    } else if (type === 'attend') {
      const attribues = [ 'race_start', 'type', 'race_name', 'race_poster', 'state', 'organizer' ];
      // 我参加的
      filter = {
        ...filter,
        include: [
          {
            model: ctx.model.Race,
            attributes: [],
            include: [{
              model: ctx.model.Account,
              as: 'organize',
              attributes: [],
            }],
          },
        ],
        raw: true,
        attributes: [
          'raceId',
          ...attribues.map(item => [ app.Sequelize.col(`race.${item}`), camelCase(item) ]),
          [ app.Sequelize.col('race.organize.account_name'), 'organizerName' ],
        ],
        order: [[ 'race', 'applyStart', 'DESC' ]],
        where: { accountId: ctx.user.accountId },
      };
      list = await ctx.service.race.getMyAttendList(filter);
    } else {
      filter.where = { ...query };
      if (keyword) {
        filter.where.raceName = { [Op.substring]: keyword };
      }
      list = await ctx.service.race.getRaceList(filter);
    }
    this.success(list);
  }

  // 获取推荐的比赛列表
  async getRecommendRace() {
    const { ctx } = this;
    const list = await ctx.service.race.getRecommendRace();
    this.success(list);
  }

  // 获取比赛详情
  async getRaceDetail() {
    const { ctx } = this;
    const { query } = ctx.request;
    ctx.validate(rules.raceDetailRule, query);

    const race = await ctx.service.race.getDetail(query.raceId);
    this.success(race);
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

    this.success(null, '新增成功');

  }

  // 编辑比赛信息
  async editRace() {
    const { ctx } = this;

    await ctx.service.race.editRace(ctx.request.body);

    this.success(null, '编辑成功');
  }

  // 删除比赛
  async delRace() {
    const { ctx } = this;
    const { raceId } = ctx.request.body;

    await ctx.service.race.delRace(raceId);

    this.success(null, '删除成功');

  }
}


module.exports = RaceController;
