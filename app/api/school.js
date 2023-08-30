'use strict';

module.exports = ctl => ({
  get: {
    '/getSchoolList': ctl.school.getSchoolList,
  },
});
