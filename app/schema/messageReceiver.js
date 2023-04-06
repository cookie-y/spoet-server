'use strict';

module.exports = app => {
  const { INTEGER, BOOLEAN } = app.Sequelize;
  return {
    // 记录Id
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // 接受者id
    receverId: {
      type: INTEGER,
      allowNull: false,
    },
    // 消息id
    messageId: {
      type: INTEGER,
      allowNull: false,
    },
    // 消息是否已读
    read: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  };

};
