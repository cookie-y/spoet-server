'use strict';

const { Controller } = require('egg');
const { isString } = require('lodash');

/**
 * BaseController
 * @class
 * @author pbove
 */
class BaseController extends Controller {

  success(data, message) {
    this.ctx.body = { code: this.ctx.SUCCESS_CODE, data: data || null, message: message || this.ctx.SUCCESS_MSG };
    this.ctx.status = this.ctx.SUCCESS_CODE;
  }

  fail(data) {
    let msg = '';
    let status = 500;
    if (isString(data)) {
      msg = data;
    } else if (Array.isArray(data.errors)) {
      const { message, field } = data.errors[0];
      msg = `${field} ${message}`;
      status = 400;
    } else {
      msg = data.message;
    }
    this.ctx.body = { message: msg, data: null };
    this.ctx.status = status;
  }

  file(stream, type) {
    const { ctx } = this;
    ctx.set('content-type', type);
    ctx.body = stream;
  }
}

module.exports = BaseController;
