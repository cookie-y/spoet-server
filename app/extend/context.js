'use strict';

module.exports = {
  SUCCESS_CODE: 200, // 成功
  SUCCESS_MSG: 'OK', // 成功消息

  async signToken(account, rememberMe) {
    return new Promise((resolve, reject) => {
      this.app.jwt.sign(
        account,
        this.app.config.jwt.secret,
        { expiresIn: rememberMe ? '7d' : '1d' },
        (err, token) => {
          err && reject(err);
          resolve(token);
        }
      );
    });
  },
};
