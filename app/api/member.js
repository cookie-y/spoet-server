'use strict';

module.exports = ctl => ({
  post: {
    '/addMember': ctl.member.addMember,
    '/editMember': ctl.member.editMember,
    '/delMember': ctl.member.delMember,
  },
  get: {
    '/getMemberList': ctl.member.getMemberList,
    '/getMemberDetail': ctl.member.getMemberDetail,
  },
});
