'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const datjs = require('dayjs');

class StorageService extends Service {
  // 新增比赛
  async uploadFile(type) {
    const { ctx, config } = this;
    const result = {};
    for (const file of ctx.request.files) {
      // 获取唯一的id
      const id = _.uniqueId(datjs().unix().toString());
      let uploadPath;
      try {
        const f = fs.readFileSync(file.filepath);
        // 创建图片保存的路径
        uploadPath = path.join(config.baseDir, `/app/public/${type}`, id);
        fs.writeFileSync(uploadPath, f);
      } finally {
        await fs.unlink(file.filepath, () => {});
      }
      const url = `http://127.0.0.1:7001/public/${type}/${id}`;
      result[file.field] = _.concat(result[file.field] || [], url);
    }
    return result;
  }

}

module.exports = StorageService;
