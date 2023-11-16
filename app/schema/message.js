'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  return {
    // 消息id
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // 消息标题
    title: {
      type: STRING(255),
      allowNull: false,
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
  };
};
