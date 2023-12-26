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
   * 修改账号基本信息
   *
   * @param {*} account 待修改的账号数据
   * @param {*} where 判断依据
   * @return {*} 修改结果
   * @memberof AccountService
   */
  async editInfo(account, where) {
    const { ctx } = this;
    const result = await ctx.model.Account.edit(account, where);
    return result;
  }

  /**
   * 更新密码
   *
   * @param {*} params 新旧密码数据
   * @param {*} where 判断依据
   * @return {*} 更新结果
   * @memberof AccountService
   */
  async editPassword(params, where) {
    const { ctx } = this;
    const result = await ctx.model.Account.edit(params, where);
    return result;
  }

  /**
   * 更新邮箱
   *
   * @param {*} params 新旧邮箱数据
   * @param {*} where 判断依据
   * @return {*} 更新结果
   * @memberof AccountService
   */
  async editEmail(params, where) {
    const { ctx } = this;
    params.email = params.newEmail;
    const result = await ctx.model.Account.edit(params, where);
    return result;
  }
}

module.exports = AccountService;
