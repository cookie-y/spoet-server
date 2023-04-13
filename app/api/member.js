'use strict';

module.exports = ctl => ({
  post: {
    '/addMember': ctl.member.addMember,
  },
});
