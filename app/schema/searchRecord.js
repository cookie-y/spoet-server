'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  return {
    // 搜索记录id
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    // 账号id
    accountId: {
      type: INTEGER,
      allowNull: false,
    },
    // 搜索内容
    content: {
      type: STRING(255),
    },
  };
};
