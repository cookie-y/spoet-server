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
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      where: {
        ...ctx.query,
        date: ctx.query.date || dayjs().format('YYYY-MM-DD'),
      },
      include: [
        {
          model: ctx.model.ParticipateRecord,
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
          as: 'A',
          include: {
            model: ctx.model.Account,
            attributes: [ 'accountId', 'accountName', 'logo' ],
            as: 'participateTeam',
          },
        },
        {
          model: ctx.model.ParticipateRecord,
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
          as: 'B',
          include: {
            model: ctx.model.Account,
            attributes: [ 'accountId', 'accountName', 'logo' ],
            as: 'participateTeam',
          },
        },
      ],
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
    const filter = {
      where: { id },
      include: [
        {
          model: ctx.model.ParticipateRecord,
          attributes: [ 'accountId', 'id' ],
          as: 'A',
          include: {
            model: ctx.model.Account,
            attributes: [ 'accountId', 'accountName', 'logo' ],
            as: 'participateTeam',
          },
        },
        {
          model: ctx.model.ParticipateRecord,
          attributes: [ 'accountId', 'id' ],
          as: 'B',
          include: {
            model: ctx.model.Account,
            attributes: [ 'accountId', 'accountName', 'logo' ],
            as: 'participateTeam',
          },
        },
      ],
    };
    const data = await ctx.service.volleyballScore.getScheduleDetail(filter);
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

  // 获取有赛程的日期列表
  async getScheduleDateList() {
    const { ctx } = this;
    await ctx.validate(rules.dateListRule, ctx.query);
    const filter = {
      attributes: [ 'date' ],
      where: {
        ...ctx.query,
      },
      group: 'date',
    };
    const data = await ctx.service.volleyballScore.getScheduleList(filter);
    this.success(data.map(item => item.date));
  }

  // 录入成绩
  async enterScore() {
    const { ctx } = this;
    await ctx.validate(rules.enterScoreRule);
    const { id, results } = ctx.request.body;
    await ctx.service.volleyballScore.editScheduleById(id, { results });
    this.success(null, '录入成功');
  }
}

module.exports = VolleyballScoreController;

