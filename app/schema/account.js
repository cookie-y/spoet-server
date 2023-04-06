'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;
  return {
    // 账号
    accountId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // 所属学校id
    schoolId: {
      type: INTEGER,
    },
    // 用户名
    accountName: {
      type: STRING(255),
      allowNull: false,
    },
    // 密码
    password: {
      type: STRING(255),
      allowNull: false,
    },
    // 邮箱
    email: {
      type: STRING(255),
      unique: true,
      allowNull: true,
    },
    // 头像
    logo: {
      type: STRING(255),
      allowNull: true,
    },
    // 超级管理员
    admin: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  };

};
