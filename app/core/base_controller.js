'use strict';

const { Controller } = require('egg');

/**
 * BaseController
 * @class
 * @author pbove
 */
class BaseController extends Controller {

  success(data) {
    this.ctx.body = { code: this.ctx.SUCCESS_CODE, data, msg: this.ctx.SUCCESS_MSG };
    this.ctx.status = this.ctx.SUCCESS_CODE;
  }

  fail(data) {
    let msg = '';
    let status = 500;
    if (Array.isArray(data.errors)) {
      const { message, field } = data.errors[0];
      msg = `${field} is ${message}`;
      status = 400;
    } else {
      msg = data.message;
    }
    this.ctx.body = { msg, data: {} };
    this.ctx.status = status;
  }

  file(stream, type) {
    const { ctx } = this;
    ctx.set('content-type', type);
    ctx.body = stream;
  }
}

module.exports = BaseController;
