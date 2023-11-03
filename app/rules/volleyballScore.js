'use strict';

// 新增赛程接口参数校验
const addRule = {
  raceId: {
    type: 'number',
    required: true,
  },
  schedule: {
    type: 'array',
    required: true,
    itemType: 'object',
    rule: {
      date: 'date',
      time: 'string',
      place: 'string',
      adversaryA: 'number',
      adversaryB: 'number',
    },
  },
};

// 根据ID编辑赛程接口参数校验
const editScheduleByIdRule = {
  id: {
    type: 'number',
    required: true,
  },
  time: {
    type: 'string',
    required: true,
  },
  date: {
    type: 'date',
    required: true,
  },
  place: {
    type: 'string',
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

// 获取赛程详情接口参数校验
const detailRule = {
  id: {
    type: 'id',
    required: true,
  },
};

// 删除赛程详情接口参数校验
const delRule = {
  id: {
    type: 'array',
    required: true,
  },
};

module.exports = {
  addRule,
  editScheduleByIdRule,
  schedleListRule,
  detailRule,
  delRule,
};
