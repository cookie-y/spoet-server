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
  };
};
