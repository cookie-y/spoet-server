'use strict';

module.exports = ctl => ({
  post: {
    '/addRace': ctl.race.addRace,
  },
});
