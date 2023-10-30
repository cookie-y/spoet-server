'use strict';

const dayjs = require('dayjs');
const Controller = require('../core/base_controller');
const rules = require('../rules/volleyballScore');

class VolleyballScoreController extends Controller {
  // 获取赛程比分列表
  async getScoreList() {
    const { ctx } = this;
    await ctx.validate(rules.schedleListRule, ctx.query);
    const { raceId, date } = ctx.query;
    const data = await ctx.service.volleyballScore.getScoreListByDate(raceId, date || dayjs().format('YYYY-MM-DD'));
    this.success(data);
  }
  // 新增赛程
  async addSchedule() {
    const { ctx } = this;
    await ctx.validate(rules.addScheduleRule);
    const { date, arrange, raceId } = ctx.request.body;
    let scheduleList = [];
    arrange.forEach(value => {
      const res = value.against.map(item => ({ date, raceId, time: value.time, adversaryA: item.opponent[0], adversaryB: item.opponent[0], place: item.place }));
      scheduleList = [ ...scheduleList, ...res ];
    });

    await ctx.service.volleyballScore.addSchedule(scheduleList);
  }
}

module.exports = VolleyballScoreController;

