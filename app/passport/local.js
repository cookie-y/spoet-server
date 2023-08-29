'use strict';


module.exports = async (ctx, account) => {

  try {
    await ctx.service.auth.validatePassword(account);
    const token = await ctx.signToken(account, false);
    ctx.body = {
      code: 1,
      message: '登录成功',
      data: token,
    };

    return account;
  } catch (err) {
    ctx.body = { ...err, data: {} };
    ctx.status = err.status;
    return {};
  }
};
