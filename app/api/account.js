'use strict';


module.exports = ctl => ({
  post: {
    // 新增账户
    '/addAccount': ctl.account.addAccount,
    // 修改账号基础资料
    '/editAccountInfo': ctl.account.editAccountInfo,
    // 校验原密码
    '/validatePassword': ctl.account.validatePassword,
    // 修改密码
    '/editPassword': ctl.account.editPassword,
    // 校验原邮箱
    '/validateEmail': ctl.account.validateEmail,
    // 修改邮箱
    '/editEmail': ctl.account.editEmail,
  },
  get: {
    // 获取账号信息
    '/getAccountInfo': ctl.account.getAccountInfo,
  },
});
