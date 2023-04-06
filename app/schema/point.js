'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;
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
      allowNull: false,
    },
    // 参赛队员所属组织
    accountId: {
      type: INTEGER,
      allowNull: false,
    },
    // 积分
    point: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    // 总得分
    score: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  };
};
