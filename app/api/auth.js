'use strict';


module.exports = ctl => ({
  post: {
    // 登录
    '/auth/signIn': ctl.passport.local,
    // 注册
    '/auth/signUp': ctl.auth.signUp,
    // 找回密码
    '/auth/resetPassword': ctl.auth.resetPassword,
  },
  get: {
    // 获取注册验证码
    '/auth/getCode': ctl.auth.getCode,
    // 获取账号状态
    '/auth/getAccountState': ctl.auth.getAccountState,
  },
});
