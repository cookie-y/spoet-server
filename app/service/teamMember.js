'use strict';

const Service = require('egg').Service;

class RaceService extends Service {
  // 新增队员
  async addTeamMember() {
    const { ctx } = this;
    const teamMember = ctx.request.body;
    const files = await ctx.service.storage.uploadFile('teamMember');
    Object.keys(files).forEach(key => {
      teamMember[key] = files[key].join(',');
    });
    console.log(files);
    console.log(teamMember);
    const result = await ctx.model.TeamMember.add(teamMember);
    return result;
  }

}

module.exports = RaceService;
