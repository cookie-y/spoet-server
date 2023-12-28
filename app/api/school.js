'use strict';

module.exports = ctl => ({
  get: {
    // 获取学校列表
    '/authUN/getSchoolList': ctl.school.getSchoolList,
  },
});
