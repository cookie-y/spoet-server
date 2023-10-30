'use strict';

module.exports = ctl => ({
  get: {
    // 获取学校列表
    '/getSchoolList': ctl.school.getSchoolList,
  },
});
