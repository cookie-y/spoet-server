'use strict';

module.exports = ctl => ({
  post: {
    // 上传
    '/upload': ctl.common.upload,
  },
});
