'use strict';

module.exports = app => {
  const Account = app.model.define('account', require('../schema/account')(app));
  const Message = app.model.define('message', require('../schema/message')(app));
  const MessageTransmission = app.model.define('messageTransmission', require('../schema/messageTransmission')(app));

  // 关系
  // 一个消息只有一个发送方
  MessageTransmission.belongsTo(Account, { as: 'sender', foreignKey: 'senderId', targetKey: 'accountId' });
  // 一个接收方可以接收多条信息 一条消息可以有多个接收方
  MessageTransmission.belongsTo(Account, { as: 'reveiver', foreignKey: 'receiverId', targetKey: 'accountId' });
  MessageTransmission.belongsTo(Message, { foreignKey: 'messageId', targetKey: 'id' });

  // 查询列表
  MessageTransmission.list = async filter => {
    const { rows, count } = await MessageTransmission.findAndCountAll(filter);
    return { list: rows, total: count };
  };

  return MessageTransmission;
};
