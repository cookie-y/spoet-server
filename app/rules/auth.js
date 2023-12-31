'use strict';

// 注册接口参数校验
const signUpRule = {
  // 所属院校
  schoolId: {
    type: 'int',
    required: true,
  },
  // 邮箱
  email: {
    type: 'email',
    required: true,
  },
  // 验证码
  code: {
    type: 'string',
    require: true,
  },
  // 申请原因
  reason: {
    type: 'string',
    required: true,
  },
};

// 登录接口参数校验
const signInRule = {
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

// 获取验证码接口参数校验
const getCodeRule = {
  // 邮箱
  email: {
    type: 'email',
    required: true,
  },
};

// 校验验证码接口参数校验
const authCodeRule = {
  // 邮箱
  email: {
    type: 'email',
  },
  // 验证码
  code: {
    type: 'string',
  },
};

// 重置密码接口参数校验
const resetPasswordRule = {
  // 邮箱
  email: {
    type: 'email',
    required: true,
  },
  // 密码
  password: {
    type: 'string',
    required: true,
  },
};


module.exports = {
  signUpRule,
  signInRule,
  getCodeRule,
  authCodeRule,
  resetPasswordRule,
};
