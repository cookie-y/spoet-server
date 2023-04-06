'use strict';

const Controller = require('../core/base_controller');
const { loginRule } = require('../rules/auth');

/**
 * 鉴权
 */
class AuthController extends Controller {
  // 登录
  async signIn() {
    const { ctx } = this;

    try {
      // 校验
      ctx.validate(loginRule);

      const res = await ctx.service.account.login(ctx.request.body);
      if (!res) {
        ctx.throw(422, 'Validation Failed', { message: '密码错误' });
      }

      this.success();
    } catch (err) {
      let msg = '';
      if (Array.isArray(err.errors)) {
        const { message, field, code } = err.errors[0];
        msg = `${field} is ${message}`;

        this.fail(code, msg);
      } else {
        msg = err.message;

        this.fail(msg);
      }
    }

  }
  // 注册
  signUp() {}
  // 找回密码
  resetPassword() {}
}

module.exports = AuthController;
