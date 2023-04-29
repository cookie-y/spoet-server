'use strict';

const Service = require('egg').Service;

class AccountService extends Service {
  async getAccountDetailById(accountId) {
    const { ctx } = this;
    return await ctx.model.Account.detail(accountId);
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
}

module.exports = AccountService;
