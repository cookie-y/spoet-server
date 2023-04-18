'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const dayjs = require('dayjs');

class StorageService extends Service {
  /**
   * 保存文件
   *
   * @param {*} content 保存目录
   * @param {*} files 文件数组
   * @return {*} 保存路径
   * @memberof StorageService
   */
  async uploadFile(content, files) {
    const { config } = this;
    const result = [];
    for (const file of files) {
      // 获取唯一的id
      const id = _.uniqueId(dayjs().unix().toString());
      const suffix = file.mimeType.split('/')[1];
      const uploadPath = path.join(config.baseDir, `/app/public/${content}`, `${id}.${suffix}`);

      try {
        const f = fs.readFileSync(file.filepath);
        fs.writeFileSync(uploadPath, f);
      } finally {
        await fs.unlink(file.filepath, () => {});
      }
      const url = `http://127.0.0.1:7001/public/${content}/${id}.${suffix}`;
      result.push(url);
    }
    return result.join(',');
  }

}

module.exports = StorageService;
