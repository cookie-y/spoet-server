'use strict';

module.exports = app => {
  const Account = app.model.define('account', require('../schema/account')(app));
  const Race = app.model.define('race', require('../schema/race')(app));
  const Message = app.model.define('message', require('../schema/message')(app));
  const MessageTransmission = app.model.define('messageTransmission', require('../schema/messageTransmission')(app));

  // #region 关系
  // 一个消息只关联一个比赛
  Message.belongsTo(Race, { foreignKey: 'raceId', targetKey: 'raceId' });
  // 一个接收方可以接收多条信息 一条消息可以有多个接收方
  Message.hasMany(MessageTransmission, { foreignKey: 'id', targetKey: 'messageId' });
  Message.belongsToMany(Account, { through: MessageTransmission, foreignKey: 'messageId', otherKey: 'receiverId' });
  // #endregion

  // 查询列表
  Message.list = async filter => {
    const { rows, count } = await Message.findAndCountAll(filter);
    return { list: rows, total: count };
  };

  // 新增
  Message.add = async message => {
    return await Message.create(message);
  };

  return Message;
};
