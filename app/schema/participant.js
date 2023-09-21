'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;
  return {
    // 记录id
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // 参赛队员学号
    studentId: {
      type: INTEGER,
      allowNull: false,
    },
    // 参赛队伍记录id
    participateId: {
      type: INTEGER,
    },
  };
};
