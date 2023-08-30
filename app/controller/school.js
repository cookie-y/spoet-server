'use strict';

const Controller = require('../core/base_controller');

class SchoolController extends Controller {
  // 获取学校列表
  async getSchoolList() {
    const { ctx } = this;
    try {
      const data = await ctx.service.school.getSchoolList();
      this.success(data);
    } catch (error) {
      this.fail(error);
    }
  }
}

module.exports = SchoolController;
