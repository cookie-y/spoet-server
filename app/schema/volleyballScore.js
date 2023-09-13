'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  return {
    // 比分记录id
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true, // 自增
    },
    // 比赛id
    raceId: {
      type: INTEGER,
    },
    // A方id
    adversaryA: {
      type: INTEGER,
      allowNull: false,
    },
    // B方id
    adversaryB: {
      type: INTEGER,
      allowNull: false,
    },
    // 比赛时间
    time: {
      type: DATE,
    },
    // 比赛场地
    place: {
      type: STRING(255),
    },
    // 比赛成绩
    result: {
      type: STRING(255),
    },
    // 获胜方id
    winner: {
      type: INTEGER,
      allowNull: false,
    },
  };
};
