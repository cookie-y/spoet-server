'use strict';

// 新增队员接口参数校验
const addMemberRule = {
  studentId: {
    type: 'string',
    required: true,
  },
  facultyId: {
    type: 'string',
    required: true,
  },
  name: {
    type: 'string',
    required: true,
  },
  sex: {
    type: 'string',
    required: true,
  },
  phone: {
    type: 'string',
    required: true,
  },
  type: {
    type: 'string',
    required: true,
  },
  isCaptain: {
    type: 'string',
    required: true,
  },
};

// 获取队员列表接口参数校验
const memberListRule = {
  accountId: {
    type: 'string',
    required: true,
  },
  page: {
    type: 'string',
    required: true,
  },
  pageSize: {
    type: 'string',
    required: true,
  },
};

module.exports = {
  addMemberRule,
  memberListRule,
};
