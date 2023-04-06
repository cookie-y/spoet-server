'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  return {
    // 学校编号
    schoolId: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    // 学校名称
    schoolName: {
      type: STRING(255),
      allowNull: false,
    },
  };
};
