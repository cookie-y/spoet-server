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
    // 比赛id
    raceId: {
      type: INTEGER,
    },
    // 参赛队员学号
    studentId: {
      type: INTEGER,
      allowNull: false,
    },
    // 参赛队员所属组织
    accountId: {
      type: INTEGER,
      allowNull: false,
    },
    // 分组情况
    group: {
      type: STRING(10),
    },
  };
};
