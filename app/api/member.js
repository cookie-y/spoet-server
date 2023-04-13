'use strict';

module.exports = ctl => ({
  post: {
    '/addMember': ctl.member.addMember,
  },
  get: {
    '/getMemberList': ctl.member.getMemberList,
    '/delMember': ctl.member.delMember,
  },
});
