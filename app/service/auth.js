'use strict';
const Service = require('egg').Service;
const bcrypt = require('bcrypt');

class AuthService extends Service {
  async signUp(message) {
    const res = await this.ctx.model.Message.add(message);
    console.log(res);
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
    const account = await ctx.model.Account.detail(accountId);
    if (!account) {
      ctx.throw(422, 'Validation Failed', { message: '账号不存在' });
    }
    if (!await bcrypt.compare(password, account.password)) {
      ctx.throw(422, 'Validation Failed', { message: '密码错误' });
    }
  }
}

module.exports = AuthService;
