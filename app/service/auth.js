'use strict';
const Service = require('egg').Service;
const bcrypt = require('bcrypt');

class AuthService extends Service {
  async signUp(message) {
    const res = await this.ctx.model.Message.add(message);
    return res;
  }
  /**
   * 校验密码
   *
   * @param {*} { accountId, password }
   * @return {boolean} 密码是否正确
   * @memberof AuthService
   */
  async validatePassword({ accountId, password }) {
    const { ctx } = this;
    const account = await ctx.model.Account.findByPk(accountId);
    if (!account) {
      ctx.throw(510, '账号不存在');
    }
    if (!await bcrypt.compare(password, account.password)) {
      ctx.throw(510, '密码错误');
    }
  }
  /**
   * 校验邮箱
   *
   * @param {*} { accountId, email }
   * @memberof AuthService
   */
  async validateEmail({ accountId, email }) {
    const { ctx } = this;
    const account = await ctx.model.Account.findByPk(accountId);
    if (!account) {
      ctx.throw(510, '账号不存在');
    }
    if (email !== account.email) {
      ctx.throw(510, '邮箱错误');
    }
  }
}

module.exports = AuthService;
