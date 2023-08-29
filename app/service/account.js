'use strict';

const Service = require('egg').Service;

class AccountService extends Service {
  async getAccountDetailById(accountId) {
    const { ctx } = this;
    const filter = {
      where: { accountId },
      include: 'school',
    };
    return await ctx.model.Account.detail(filter);
  }

  /**
   * 新增账号
   *
   * @param {*} account 账号数据
   * @return {*} 新增结果
   * @memberof AccountService
   */
  async add(account) {
    const { ctx } = this;
    const result = await ctx.model.Account.add(account);
    return result;
  }

  /**
   * 更新密码
   *
   * @param {*} params 新旧密码数据
   * @return {*} 更新结果
   * @memberof AccountService
   */
  async editPassword(params) {
    const { ctx } = this;
    params.password = params.newPassword;
    const result = await ctx.model.Account.edit(params);
    return result;
  }

  /**
   * 更新邮箱
   *
   * @param {*} params 新旧邮箱数据
   * @return {*} 更新结果
   * @memberof AccountService
   */
  async editEmail(params) {
    const { ctx } = this;
    params.email = params.newEmail;
    const result = await ctx.model.Account.edit(params);
    return result;
  }
}

module.exports = AccountService;
