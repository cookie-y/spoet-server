'use strict';

const { signUpRule } = require('../rules/auth');
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
        content: reason,
        senderId: 1,
      };
      await ctx.service.auth.signUp(message);
      this.success();
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
    const code = random(1000, 9999);
    const res = await ctx.service.mail.sendCodeMail(email, code);
    await app.redis.set(`email:${email}`, code, 'EX', 60);
    if (res) {
      this.success(code);
    } else {
      this.fail('发送失败');
    }
  }

  // 找回密码
  resetPassword() {}
}

module.exports = AuthController;
