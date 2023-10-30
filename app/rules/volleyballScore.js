'use strict';

// 新增赛程接口参数校验
const addScheduleRule = {
  date: {
    type: 'date',
    required: true,
  },
  arrange: {
    type: 'array',
    required: true,
  },
};

// 获取指定日期赛程列表接口参数校验
const schedleListRule = {
  raceId: {
    type: 'id',
    required: true,
  },
  date: {
    type: 'date',
    required: false,
  },
};

module.exports = {
  addScheduleRule,
  schedleListRule,
};
