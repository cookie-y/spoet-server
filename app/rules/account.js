'use strict';

// 校验密码接口参数校验
const validatePasswordRule = {
  // 账号Id
  accountId: {
    type: 'int',
    required: true,
  },
  // 密码
  password: {
    type: 'string',
    required: true,
  },
};

module.exports = {
  validatePasswordRule,
};
