'use strict';

const { signUpRule, getCodeRule, resetPasswordRule, authCodeRule } = require('../rules/auth');
const Controller = require('../core/base_controller');
const { random } = require('lodash');

/**
 * 鉴权
 */
class AuthController extends Controller {
  // 注册
  async signUp() {
    const { ctx, app } = this;
    try {
      ctx.validate(signUpRule);
      const { reason, code, email } = ctx.request.body;
      if (code !== await app.redis.get(`email:${email}`)) {
        ctx.throw(422, 'Validation Failed', { message: '验证码已过期，请重新获取' });
      }
      const message = {
        title: '申请注册',
        content: reason,
      };
      await ctx.service.auth.signUp(message);
      this.success(null, '注册成功，待管理员审核');
    } catch (error) {
      this.fail(error);
    }
  }

  // 获取账号状态
  async getAccountState() {
    const { ctx } = this;
    const query = ctx.request.query;
    const account = await ctx.service.account.getAccountState(query);
    this.success(account);
  }

  // 发送验证码（邮件）
  async getCode() {
    const { ctx, app } = this;
    const { email } = ctx.request.query;
    ctx.validate(getCodeRule, ctx.request.query);
    const code = random(100000, 999999);
    const res = await ctx.service.mail.sendCodeMail(email, code);
    await app.redis.set(`email:${email}`, code, 'EX', 60);
    if (res) {
      this.success(null, '验证码已发送');
    } else {
      this.fail('发送失败');
    }
  }

  // 验证码校验
  async authCode() {
    const { ctx, app } = this;
    ctx.validate(authCodeRule);
    const { email, code } = ctx.request.body;
    const rightCode = await app.redis.get(`email:${email}`);
    console.log(rightCode);
    if (rightCode && rightCode === code) {
      this.success(null, '验证通过');
    } else {
      this.fail('验证失败');
    }
  }

  // 找回密码
  async resetPassword() {
    const { ctx } = this;
    ctx.validate(resetPasswordRule);
    const { password, email } = ctx.request.body;
    await ctx.service.account.editPassword({ password }, { email });
    this.success(null, '密码已重置，请重新登录');
  }
}

module.exports = AuthController;
