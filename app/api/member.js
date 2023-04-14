'use strict';

module.exports = ctl => ({
  post: {
    '/addMember': ctl.member.addMember,
    '/editMember': ctl.member.editMember,
  },
  get: {
    '/getMemberList': ctl.member.getMemberList,
    '/getMemberDetail': ctl.member.getMemberDetail,
    '/delMember': ctl.member.delMember,
  },
});
