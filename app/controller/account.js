'use strict';
const Controller = require('../core/base_controller');
const rules = require('../rules/account');

/**
 * * 账号
 */
class AccountController extends Controller {

  // 获取用户信息
  async getAccountInfo() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      const user = await ctx.service.account.getAccountDetailById(ctx.user.accountId);
      this.success(user);
    }
  }

  // 新增账号
  async addAccount() {
    const { ctx } = this;
    await ctx.service.account.add(ctx.request.body);
    this.success(ctx.state);
  }

  // 更新账号信息
  async editAccountInfo() {
    const { ctx } = this;

    if (ctx.isAuthenticated()) {
      ctx.validate(rules.editAccountInfoRule);

      await ctx.service.account.editInfo({ ...ctx.request.body }, { accountId: ctx.user.accountId });

      this.success(null, '修改成功');
    }

  }

  // 校验原密码
  async validatePassword() {
    const { ctx } = this;

    if (ctx.isAuthenticated()) {
      ctx.validate(rules.validatePasswordRule);

      await ctx.service.auth.validatePassword({ ...ctx.request.body, accountId: ctx.user.accountId });

      this.success(null, '密码正确');
    }
  }

  // 修改密码
  async editPassword() {
    const { ctx } = this;
    ctx.validate(rules.editPasswordRule);
    const { newPassword } = ctx.request.body;
    await ctx.service.account.editPassword({ password: newPassword }, { accountId: ctx.user.accountId });
    this.success(null, '修改成功');
  }

  // 校验原邮箱
  async validateEmail() {
    const { ctx } = this;

    if (ctx.isAuthenticated()) {
      ctx.validate(rules.validateEmailRule);

      await ctx.service.auth.validateEmail({ ...ctx.request.body, accountId: ctx.user.accountId });

      this.success(null, '邮箱正确');
    }
  }

  // 修改邮箱
  async editEmail() {
    const { ctx } = this;
    ctx.validate(rules.editEmailRule);
    await ctx.service.account.editEmail({ ...ctx.request.body }, { accountId: ctx.user.accountId });
    this.success(null, '修改成功');
  }

}

module.exports = AccountController;
