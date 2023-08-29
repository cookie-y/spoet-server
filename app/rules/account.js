'use strict';

// 校验密码接口参数校验
const validatePasswordRule = {
  // 密码
  password: {
    type: 'string',
    required: true,
  },
};

// 修改密码接口参数校验
const editPasswordRule = {
  // 新密码
  newPassword: {
    type: 'string',
    required: true,
  },
  // 旧密码
  oldPassword: {
    type: 'string',
    required: true,
  },
};

// 校验邮箱接口参数校验
const validateEmailRule = {
  // 密码
  email: {
    type: 'string',
    required: true,
  },
};

// 修改邮箱接口参数校验
const editEmailRule = {
  // 新邮箱
  newEmail: {
    type: 'email',
    required: true,
  },
  // 旧邮箱
  oldEmail: {
    type: 'email',
    required: true,
  },
};

module.exports = {
  validatePasswordRule,
  editPasswordRule,
  validateEmailRule,
  editEmailRule,
};
