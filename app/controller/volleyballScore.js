'use strict';

const dayjs = require('dayjs');
const Controller = require('../core/base_controller');
const rules = require('../rules/volleyballScore');
const { groupBy, pick } = require('ramda');

class VolleyballScoreController extends Controller {
  // 获取赛程列表
  async getScheduleList() {
    const { ctx } = this;
    await ctx.validate(rules.schedleListRule, ctx.query);
    const filter = {
      ...ctx.query,
      date: ctx.query.date || dayjs().format('YYYY-MM-DD'),
    };
    let data = await ctx.service.volleyballScore.getScheduleList(filter);
    if (!ctx.query.time) {
      data = groupBy(item => item.time, data);
    }
    this.success(data);
  }

  // 获取赛程详情
  async getScheduleDetail() {
    const { ctx } = this;
    await ctx.validate(rules.detailRule, ctx.query);
    const { id } = ctx.request.query;
    const data = await ctx.service.volleyballScore.getScheduleDetail(id);
    this.success(data);
  }

  // 新增赛程
  async addOrUpdateSchedule() {
    const { ctx } = this;
    // 校验
    await ctx.validate(rules.addRule);
    // 参数过滤
    const { schedule, raceId } = ctx.request.body;
    const scheduleList = schedule.map(item => ({ raceId, ...pick([ 'date', 'time', 'adversaryA', 'adversaryB', 'place', 'id' ], item) }));

    await ctx.service.volleyballScore.addOrUpdateSchedule(scheduleList);
    this.success(null, '修改成功');
  }

  // 根据ID修改赛程
  async editScheduleById() {
    const { ctx } = this;
    await ctx.validate(rules.editScheduleByIdRule);
    const { id, ...schedule } = ctx.request.body;
    await ctx.service.volleyballScore.editScheduleById(id, schedule);
    this.success(null, '修改成功');
  }

  // 删除赛程
  async delSchedule() {
    const { ctx } = this;
    await ctx.validate(rules.delRule);
    const { id } = ctx.request.body;
    await ctx.service.volleyballScore.delSchedule(id);
    this.success(null, '删除成功');
  }
}

module.exports = VolleyballScoreController;

