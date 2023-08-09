'use strict';

const LocalStrategy = require('passport-local').Strategy;

const mountPassportToCantroller = (keys, passport, controller) => {
  if (!controller.passport) {
    controller.passport = {};
  }
  keys.forEach(value => {
    controller.passport[value] = passport.authenticate(value, { session: false, successRedirect: undefined });
  });
};

const installPassport = (passport, { verify }) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'accountId',
        passReqToCallback: true },
      (req, accountId, password, done) => {
        const account = {
          provider: 'local',
          accountId,
          password,
        };
        passport.doVerify(req, account, done);
      }
    )
  );
  passport.verify(verify);
};

module.exports = {
  mountPassportToCantroller,
  installPassport,
};
