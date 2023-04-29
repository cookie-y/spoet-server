'use strict';
const Controller = require('../core/base_controller');
const rules = require('../rules/account');

/**
 * * 安全
 */
class SecurityController extends Controller {

  // 获取用户信息
  async getAccountInfo() {
    const { ctx } = this;

    const user = await ctx.service.account.getAccountDetailById(45);
    this.success(user);
  }

  // 新增账号
  async addAccount() {
    const { ctx } = this;
    await ctx.service.account.add(ctx.request.body);
    this.success(ctx.state);
  }

  // 更新信息
  async update() {
    const { ctx } = this;

    const user = await ctx.service.security.update(ctx.request.body);

    this.success(user);
  }

  // 校验原密码
  async validatePassword() {
    const { ctx } = this;
    try {
      ctx.validate(rules.validatePasswordRule);

      await ctx.service.auth.validatePassword(ctx.request.body);

      this.success(null, '密码正确');

    } catch (error) {
      this.fail(error);
    }
  }

  // 修改密码
  updatePassword() {}

  // 校验原邮箱
  validateEmail() {}

  // 修改邮箱
  updateEmail() {}

}

module.exports = SecurityController;
