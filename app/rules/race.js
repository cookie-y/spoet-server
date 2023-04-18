'use strict';

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
  addRaceRule,
};
