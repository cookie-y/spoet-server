'use strict';

module.exports = ctl => ({
  post: {
    // 新增成员
    '/addMember': ctl.member.addMember,
    // 编辑成员信息
    '/editMember': ctl.member.editMember,
    // 删除成员
    '/delMember': ctl.member.delMember,
  },
  get: {
    // 获取某个账号的成员列表
    '/getMemberList': ctl.member.getMemberList,
    // 获取成员详细信息
    '/getMemberDetail': ctl.member.getMemberDetail,
  },
});
