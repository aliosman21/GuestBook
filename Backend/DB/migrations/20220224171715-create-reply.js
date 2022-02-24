'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Replies", {
       id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
       },
       content: {
          type: Sequelize.TEXT,
       },
       UserId: {
          type: Sequelize.INTEGER,
          references: {
             model: "Users",
             key: "id",
          },
       },
       MessageId: {
          type: Sequelize.INTEGER,
          references: {
             model: "Messages",
             key: "id",
          },
       },
       createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
       },
       updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
       },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Replies');
  }
};