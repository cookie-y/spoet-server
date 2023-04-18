'use strict';

// 获取队员列表接口参数校验
const memberListRule = {
  accountId: {
    type: 'stringNumber',
    required: true,
  },
  page: {
    type: 'stringNumber',
    required: true,
  },
  pageSize: {
    type: 'stringNumber',
    required: true,
  },
};

// 删除、查询详情接口参数校验
const delOrDetailRule = {
  studentId: {
    type: 'stringNumber',
    required: true,
  },
  facultyId: {
    type: 'stringNumber',
    required: true,
  },
};

// 新增队员接口参数校验
const addOrEditMemberRule = {
  studentId: {
    type: 'stringNumber',
    required: true,
  },
  facultyId: {
    type: 'stringNumber',
    required: true,
  },
  name: {
    type: 'string',
    required: true,
  },
  sex: {
    type: 'enum',
    required: true,
    values: [ '0', '1' ],
  },
  phone: {
    type: 'stringNumber',
    required: true,
  },
  type: {
    type: 'stringNumber',
    required: true,
    max: 5,
  },
  isCaptain: {
    type: 'enum',
    required: true,
    values: [ '0', '1' ],
  },
};

module.exports = {
  addOrEditMemberRule,
  memberListRule,
  delOrDetailRule,
};
