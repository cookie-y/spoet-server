'use strict';

module.exports = app => {
  const Account = app.model.define('scoreRecordVolleyball', require('../schema/volleyballScore')(app));

  return Account;
};
