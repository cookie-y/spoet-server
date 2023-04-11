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

  fail(code, msg) {
    this.ctx.body = { code, msg, data: {} };
    this.ctx.status = 200;
  }

  file(stream, type) {
    const { ctx } = this;
    ctx.set('content-type', type);
    ctx.body = stream;
  }
}

module.exports = BaseController;
