'use strict';

// 获取比赛列表接口参数校验
const raceListRule = {
  state: {
    type: 'stringNumber',
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
  raceEnd: {
    type: 'date',
    required: false,
  },
  organizer: {
    type: 'id',
    required: true,
  },
};


module.exports = {
  raceListRule,
  addRaceRule,
};
