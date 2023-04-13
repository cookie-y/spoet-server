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

}

module.exports = RaceService;
