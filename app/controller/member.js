'use strict';

const Controller = require('../core/base_controller');
const rules = require('../rules/member');

class MemberController extends Controller {
  // 获取队员列表
  async getMemberList() {
    const { ctx } = this;
    const { page, pageSize } = ctx.request.query;
    const query = {
      facultyId: +ctx.user.accountId,
    };
    ctx.validate(rules.memberListRule, ctx.request.query);
    const data = await ctx.service.member.getMemberList(query, +page, +pageSize);
    this.success(data);
  }

  // 获取队员详情
  async getMemberDetail() {
    const { ctx } = this;
    ctx.validate(rules.delOrDetailRule, ctx.request.query);
    const data = await ctx.service.member.getMemberDetailById({ ...ctx.request.query, facultyId: ctx.user.accountId });
    this.success(data);
  }

  // 新增队员
  async addMember() {
    const { ctx } = this;
    const data = ctx.request.body;
    const member = {
      ...data,
      studentId: +data.studentId,
      facultyId: ctx.user.accountId,
    };
    ctx.validate(rules.addOrEditMemberRule);
    await ctx.service.member.addMember(member);
    this.success(null, '新增成功');
  }

  // 编辑队员
  async editMember() {
    const { ctx } = this;
    const { studentId, ...member } = ctx.request.body;
    ctx.validate(rules.addOrEditMemberRule);
    await ctx.service.member.editMember(member, { studentId, facultyId: ctx.user.accountId });
    this.success(null, '编辑成功');
  }

  // 删除队员
  async delMember() {
    const { ctx } = this;
    ctx.validate(rules.delOrDetailRule);
    await ctx.service.member.delMember(ctx.request.body);
    this.success(null, '删除成功');
  }
}

module.exports = MemberController;
