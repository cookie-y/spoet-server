'use strict';

const Service = require('egg').Service;
const bcrypt = require('bcrypt');
const saltRounds = 10;

class AccountService extends Service {
  // 登录
  async login(data) {
    const { ctx } = this;
    const account = await ctx.model.Account.findById(data.accountId);
    return account.password === data.password;
  }

  // 注册
  async register(data) {
    const { ctx } = this;
    const account = {
      schoolId: data.schoolId,
      password: bcrypt.hashSync(`a${data.schoolId}`, saltRounds),
    };
    const result = await ctx.model.Account.add(account);
  }
}

module.exports = AccountService;
