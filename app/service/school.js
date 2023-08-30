'use strict';
const Service = require('egg').Service;
const { Op } = require('sequelize');

class SchoolService extends Service {
  /**
   * 获取学校列表
   *
   * @param {Boolean} isAdmin 是否是管理员
   * @return {Array} 学校列表
   * @memberof SchoolService
   */
  async getSchoolList(isAdmin = false) {
    const { ctx } = this;
    const op = isAdmin ? 'eq' : 'ne';
    const param = {
      where: {
        schoolId: { [Op[op]]: 1 },
      },
    };
    const list = await ctx.model.School.list(param);
    return list;
  }
}

module.exports = SchoolService;
