'use strict';

const Controller = require('../core/base_controller');

class SchoolController extends Controller {
  // 获取学校列表
  async getSchoolList() {
    const { ctx } = this;
    const data = await ctx.service.school.getSchoolList();
    this.success(data);
  }
}

module.exports = SchoolController;
