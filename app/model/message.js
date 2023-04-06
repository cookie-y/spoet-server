'use strict';

module.exports = app => {
  const Account = app.model.define('account', require('../schema/account')(app));
  const Race = app.model.define('race', require('../schema/race')(app));
  const Message = app.model.define('message', require('../schema/message')(app));
  const MessageReceiver = app.model.define('messageReceiver', require('../schema/messageReceiver')(app));

  // 关系
  Message.belongsTo(Account, { foreignKey: 'sender', targetKey: 'accountId' }); // 一个消息只有一个发送方
  Message.belongsTo(Race, { foreignKey: 'related', targetKey: 'raceId' }); // 一个消息只关联一个比赛
  Message.hasMany(MessageReceiver, { foreignKey: 'messageId', targetKey: 'id' }); // 一个账号可接收多条信息


  return Message;
};
