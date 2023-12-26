'use strict';
const Controller = require('../core/base_controller');
const rules = require('../rules/participate');


class ParticipateController extends Controller {
  // 新增参赛队员
  async addParticipants() {
    const { ctx } = this;

    ctx.validate(rules.addParticipantRule);
    const { raceId, participants } = ctx.request.body;

    const participantId = await ctx.service.participateRecord.addParticipatingTeam(raceId, ctx.user.accountId);

    if (!participantId) {
      return;
    }
    await ctx.service.participant.addParticipants(participantId, participants);
    this.success(null, '参赛成功');
  }

  // 分组
  async editGroupInf() {
    try {
      const { ctx } = this;
      ctx.validate(rules.groupRule);
      const { raceId, list } = ctx.request.body;
      await ctx.service.participateRecord.editGroupInf(raceId, list);
      this.success(null, '分组成功');
    } catch (error) {
      console.log(error);
    }
  }

  // 获取比赛的所有参赛队员
  async getParticipateTeamList() {
    const { ctx } = this;
    ctx.validate(rules.getParticipateTeamListRule, ctx.request.query);
    const list = await ctx.service.participateRecord.getParticipateTeamList(ctx.request.query.raceId);
    this.success(list);
  }

  // 获取某个比赛某个队伍的参赛队员
  async getTeamParticipantList() {
    const { ctx } = this;
    ctx.validate(rules.getTeamParticipantListRule, ctx.request.query);
    const { participateId } = ctx.request.query;
    const list = await ctx.service.participant.getTeamParticipantList({ participateId });
    this.success(list);
  }

}

module.exports = ParticipateController;
