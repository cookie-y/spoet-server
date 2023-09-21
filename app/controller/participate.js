'use strict';
const Controller = require('../core/base_controller');
const rules = require('../rules/participate');


class AccountController extends Controller {
  async addParticipants() {
    const { ctx } = this;

    ctx.validate(rules.addParticipantRule);
    const { raceId, participants } = ctx.request.body;

    const participantId = await ctx.service.participateRecord.addParticipatingTeam(raceId, ctx.user.accountId);

    // if (!participantId) {
    //   return;
    // }
    await ctx.service.participant.addParticipants(participantId, participants);
    // this.success();
  }

}

module.exports = AccountController;
