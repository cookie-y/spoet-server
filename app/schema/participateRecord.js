'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  return {
    // 记录id
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true, // 自增
    },
    // 参赛队员所属组织
    accountId: {
      type: INTEGER,
      allowNull: false,
    },
    // 比赛id
    raceId: {
      type: INTEGER,
    },
    // 分组情况
    group: {
      type: STRING(10),
    },
  };
};
