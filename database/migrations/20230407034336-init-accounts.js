'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, BOOLEAN, STRING } = Sequelize;
    await queryInterface.createTable('accounts', {
      accountId: { type: INTEGER, primaryKey: true, autoIncrement: true },
      schoolId: { type: INTEGER },
      accountName: { type: STRING(255), allowNull: false },
      password: { type: STRING(255), allowNull: false },
      email: { type: STRING(255), unique: true, allowNull: true },
      logo: { type: STRING(255), allowNull: true },
      admin: { type: BOOLEAN, allowNull: false, defaultValue: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('accounts');
  },
};
