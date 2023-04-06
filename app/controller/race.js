'use strict';
const _ = require('lodash');
const Controller = require('../core/base_controller');
const { raceRule } = require('../rules/race');

/**
 * * 安全
 */
class RaceController extends Controller {

  // 获取比赛详情
  async getDetail() {
    const { ctx } = this;
    const race = await ctx.service.race.getDetail();
    this.success(race);
  }

  // 获取比赛列表
  async getList() {
    const { ctx } = this;
    const race = await ctx.service.race.getRaceList();
    this.success(race);
  }

  // 获取我举办的比赛列表
  async getMyHostRaces() {
    const { ctx } = this;
    const { accountId, page = 1, size = 10 } = ctx.query;
    const list = await ctx.service.race.getMyHostList(+accountId, page, size);

    this.success(list);
  }

  // 获取我参加的比赛列表
  async getMyAttendRaces() {
    const { ctx } = this;
    const { accountId, page = 1, size = 10 } = ctx.query;
    const list = await ctx.service.race.getMyAttendList(+accountId, page, size);

    this.success(list);
  }

  // 获取热搜列表
  async getHotList() {
    const { ctx } = this;
    const race = await ctx.service.race.getHotList();
    this.success(race);
  }

  // 更新比赛信息
  async update() {
    const { ctx } = this;

    const user = await ctx.service.race.update(ctx.request.body);

    this.success(user);
  }


  // 新增比赛
  async add() {
    const { ctx } = this;

    // 校验
    ctx.validate(raceRule);

    const result = await ctx.service.race.addRace();

    result ? this.success() : this.fail(401, '登录失效，请重新登录');
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
