'use strict';

const Service = require('egg').Service;

class RaceService extends Service {
  // 新增队员
  async addMember(member) {
    const { ctx } = this;
    const image = await ctx.service.storage.uploadFile('member', member.image);
    const data = { ...member, image };
    const result = await ctx.model.Member.add(data);
    return result;
  }

  // 获取队员列表
  async getMemberList(query, page, pageSize) {
    const { ctx } = this;
    const result = await ctx.model.Member.list(query, pageSize, (page - 1) * pageSize);
    return { ...result, page, pageSize };
  }

  // 删除队员
  async delMember(query) {
    const { ctx } = this;
    return await ctx.model.Member.del(query);
  }

}

module.exports = RaceService;
