'use strict';
const Controller = require('../core/base_controller');

/**
 * * 安全
 */
class SecurityController extends Controller {

  // 获取用户信息
  async index() {
    const { ctx } = this;

    const user = await ctx.model.Account.findById(1);
    this.success(user);
  }

  // 更新信息
  async update() {
    const { ctx } = this;

    const user = await ctx.service.security.update(ctx.request.body);

    this.success(user);
  }

  // 校验原密码
  validatePassword() {}

  // 修改密码
  updatePassword() {}

  // 校验原邮箱
  validateEmail() {}

  // 修改邮箱
  updateEmail() {}

}

module.exports = SecurityController;
