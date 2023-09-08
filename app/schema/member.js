'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;
  return {
    // 学号
    studentId: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    // 所属学院id
    facultyId: {
      type: INTEGER,
      allowNull: false,
    },
    // 姓名
    name: {
      type: STRING(255),
      allowNull: false,
    },
    // 性别
    sex: {
      type: INTEGER,
      allowNull: false,
    },
    // 图片
    image: {
      type: STRING(255),
    },
    // 联系方式
    phone: {
      type: STRING(255),
      allowNull: true,
    },
    // 类型
    type: {
      type: INTEGER,
      allowNull: true,
      comment: '0 主攻手 1 二传 2 副攻 3 自由人 4 接应',
    },
    // 是否为队长
    isCaptain: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  };
};
