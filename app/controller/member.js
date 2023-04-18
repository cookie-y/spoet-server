'use strict';

const Controller = require('../core/base_controller');
const rules = require('../rules/member');

class MemberController extends Controller {
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

  // 获取队员详情
  async getMemberDetail() {
    const { ctx } = this;
    try {
      ctx.validate(rules.delOrDetailRule, ctx.request.query);
      const data = await ctx.service.member.getMemberDetailById(ctx.request.query);
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }

  // 新增队员
  async addMember() {
    const { ctx } = this;
    const data = ctx.request.body;
    const member = {
      ...data,
      studentId: +data.studentId,
      facultyId: +data.facultyId,
      image: ctx.request.files,
    };
    try {
      ctx.validate(rules.addOrEditMemberRule);
      await ctx.service.member.addMember(member);
      this.success(null, '新增成功');
    } catch (error) {
      this.fail(error);
    }
  }

  // 编辑队员
  async editMember() {
    const { ctx } = this;
    const { studentId, facultyId, image, ...others } = ctx.request.body;
    const member = {
      ...others,
      image: image || ctx.request.files,
    };
    try {
      ctx.validate(rules.addOrEditMemberRule);
      await ctx.service.member.editMember(member, { studentId, facultyId });
      this.success(null, '编辑成功');
    } catch (error) {
      this.fail(error);
    }
  }

  // 删除队员
  async delMember() {
    const { ctx } = this;
    try {
      ctx.validate(rules.delOrDetailRule, ctx.request.query);
      await ctx.service.member.delMember(ctx.request.query);
      this.success(null, '删除成功');
    } catch (error) {
      this.fail(error);
    }
  }
}

module.exports = MemberController;
