'use strict';

const Controller = require('../core/base_controller');
const ruls = require('../rules/common');

class CommonController extends Controller {
  // 上传
  async upload() {
    const { ctx } = this;
    ctx.validate(ruls.uploadRule);
    const { type } = ctx.request.body;
    const files = ctx.request.files;
    let url = '';
    url = await ctx.service.storage.uploadFile(type, files);
    this.success({ url }, '上传成功');
  }
}

module.exports = CommonController;
