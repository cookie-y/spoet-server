'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATEONLY, TIME } = app.Sequelize;
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
    // A方参赛id
    adversaryA: {
      type: INTEGER,
      allowNull: false,
    },
    // B方参赛id
    adversaryB: {
      type: INTEGER,
      allowNull: false,
    },
    // 比赛日期
    date: {
      type: DATEONLY,
    },
    // 比赛时间
    time: {
      type: TIME,
    },
    // 比赛场地
    place: {
      type: STRING(255),
    },
    // 比赛成绩
    result: {
      type: STRING(255),
    },
    // 积分
    integral: {
      type: STRING(255),
    },
  };
};
