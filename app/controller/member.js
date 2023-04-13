'use strict';


const Controller = require('../core/base_controller');
const rules = require('../rules/member');

class MemberController extends Controller {
  // 新增队员
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

  // 获取队员列表
  async getMemberList() {
    const { ctx } = this;
    const { accountId, page, pageSize } = ctx.request.query;
    const query = {
      facultyId: +accountId,
    };
    try {
      ctx.validate(rules.memberListRule, ctx.request.query);
      const data = await ctx.service.member.getMemberList(query, +page, +pageSize);
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }

  // 删除队员
  async delMember() {
    const { ctx } = this;
    const { studentId, accountId } = ctx.request.query;
    const query = {
      facultyId: +accountId,
      studentId: +studentId,
    };
    try {
      const data = await ctx.service.member.delMember(query);
      this.success(data, '删除成功');
    } catch (error) {
      this.fail(error);
    }
  }
}

module.exports = MemberController;
