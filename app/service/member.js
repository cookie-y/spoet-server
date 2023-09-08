'use strict';

const Service = require('egg').Service;
const { is } = require('ramda');

class RaceService extends Service {
  /**
   * 获取队员列表
   *
   * @param {*} query 查询条件
   * @param {*} page 页数
   * @param {*} pageSize 每页数量
   * @return {*} 查询结果
   * @memberof RaceService
   */
  async getMemberList(query, page, pageSize) {
    const { ctx } = this;
    const result = await ctx.model.Member.list(query, pageSize, (page - 1) * pageSize);
    return { ...result, page, pageSize };
  }

  // 获取队员详情
  async getMemberDetailById(query) {
    const { ctx } = this;
    return await ctx.model.Member.detail(query);
  }

  // 新增队员
  async addMember(member) {
    const { ctx } = this;
    const result = await ctx.model.Member.add(member);
    if (!result) {
      ctx.throw(510, '该学号已绑定');
    }
    return result;
  }

  // 编辑队员
  async editMember(member, where) {
    const { ctx } = this;
    let image = member.image;
    if (!is(String, image)) {
      image = await ctx.service.storage.uploadFile('member', image);
    }
    const data = { ...member, image };
    const result = await ctx.model.Member.edit(data, where);
    return result;
  }

  // 删除队员
  async delMember(query) {
    const { ctx } = this;
    return await ctx.model.Member.del(query);
  }

}

module.exports = RaceService;
