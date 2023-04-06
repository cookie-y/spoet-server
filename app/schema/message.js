'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  return {
    // 消息id
    messageId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // 消息内容
    content: {
      type: STRING(255),
      allowNull: false,
    },
    // 关联比赛Id
    raceId: {
      type: INTEGER,
      allowNull: true,
    },
    // 发送方Id
    senderId: {
      type: INTEGER,
      allowNull: false,
    },
  };
};
