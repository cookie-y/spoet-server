'use strict';


module.exports = ctl => ({
  get: {
    // 获取消息列表
    '/getMsgList': ctl.message.getMsgList,
    // 获取消息列表
    '/getMsgDetail': ctl.message.getMsgDetail,
  },
});
