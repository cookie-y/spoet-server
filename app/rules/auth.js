'use strict';


const registerRule = {
  reson: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'email',
    required: false,
  },
  schoolId: {
    type: 'int',
    required: true,
  },
};

const loginRule = {
  accountId: {
    type: 'int',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
};


module.exports = {
  registerRule,
  loginRule,
};
