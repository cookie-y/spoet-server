'use strict';

module.exports = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  validate: {
    enable: true,
    package: 'egg-validate',
  },

  passport: {
    enable: true,
    package: 'egg-passport',
  },

  passportLocal: {
    enable: true,
    package: 'egg-passport-local',
  },

  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  redis: {
    enable: true,
    package: 'egg-redis',
  },
};
