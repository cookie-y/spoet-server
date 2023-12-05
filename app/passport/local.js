'use strict';
const { signInRule } = require('../rules/auth');

module.exports = async (ctx, account) => {

  try {
    ctx.validate(signInRule);
    await ctx.service.auth.validatePassword(account);
    await ctx.service.auth.validatePassword(account);
    const token = await ctx.signToken(account, false);
    ctx.body = {
      code: 200,
      message: '登录成功',
      data: token,
    };

    return account;
  } catch (err) {
    ctx.body = { ...err, data: null };
    ctx.status = err.status;
    return {};
  }
};
