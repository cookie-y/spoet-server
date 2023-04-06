'use strict';


module.exports = ctl => ({
  post: {
    // 登录
    '/signIn': ctl.auth.signIn,
    // 注册
    '/signUp': ctl.auth.signUp,
    // 找回密码
    '/resetPassword': ctl.auth.resetPassword,
  },
});
