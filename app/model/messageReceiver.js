'use strict';

module.exports = app => {
  const Account = app.model.define('account', require('../schema/account')(app));
  const Message = app.model.define('message', require('../schema/message')(app));
  const MessageReceiver = app.model.define('messageReceiver', require('../schema/messageReceiver')(app));

  // 关系
  MessageReceiver.belongsTo(Account, { foreignKey: 'receverId', targetKey: 'accountId' }); // 一个消息只有一个发送方
  MessageReceiver.belongsTo(Message, { foreignKey: 'messageId', targetKey: 'id' }); // 一个消息只关联一个比赛

  return MessageReceiver;
};
