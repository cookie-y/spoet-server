'use strict';


const Controller = require('../core/base_controller');
const rules = require('../rules/member');

class MemberController extends Controller {
  async addMember() {
    const { ctx } = this;
    const data = ctx.request.body;
    const member = {
      ...data,
      studentId: +data.studentId,
      facultyId: +data.facultyId,
      sex: +data.sex,
      type: +data.type,
      isCaptain: +data.isCaptain,
      image: ctx.request.files,
    };
    try {
      ctx.validate(rules.addMemberRule);
      await ctx.service.member.addMember(member);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }
}

module.exports = MemberController;
