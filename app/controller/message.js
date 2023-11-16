'use strict';

const Controller = require('../core/base_controller');

class MessageController extends Controller {
  // 获取消息列表
  async getMsgList() {
    const { ctx } = this;
    const { page, pageSize } = ctx.request.query;
    const result = await ctx.service.messageTransmission.getMsgList(ctx.user.accountId, +page, +pageSize);
    this.success(result);
  }
  // 获取消息列表
  async getMsgDetail() {
    const { ctx } = this;
    const { page, pageSize, senderId } = ctx.request.query;
    const result = await ctx.service.messageTransmission.getMsgDetail(senderId, ctx.user.accountId, +page, +pageSize);
    this.success(result);
  }

}

module.exports = MessageController;
