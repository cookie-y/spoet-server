'use strict';

// 获取比赛列表接口参数校验
const raceListRule = {
  type: {
    type: 'string',
    required: false,
  },
  state: {
    type: 'stringNumber',
    required: false,
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

// 获取比赛详情接口参数校验
const raceDetailRule = {
  raceId: {
    type: 'id',
    require: true,
  },
};

// 新增比赛接口参数校验
const addRaceRule = {
  raceName: {
    type: 'string',
    required: true,
  },
  applyStart: {
    type: 'date',
    required: false,
  },
  applyDeadline: {
    type: 'date',
    required: false,
  },
  raceStart: {
    type: 'date',
    required: false,
  },
};


module.exports = {
  raceListRule,
  raceDetailRule,
  addRaceRule,
};
