'use strict';
const faker = require("faker");
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [];
    for (let i = 0; i < 100; i++) {
       users.push({
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.datatype.string(10),
          avatar: Math.random().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
       });
    }
    const messages = [];
    for (let i = 0; i < 1000; i++) {
       messages.push({
          content: faker.lorem.words(8),
          FromUserId: Math.floor(Math.random() * 100 + 1),
          ToUserId: Math.floor(Math.random() * 100 + 1),
          createdAt: new Date(),
          updatedAt: new Date(),
       });
    }
     await queryInterface.bulkInsert("Users", users, {});
     await queryInterface.bulkInsert("Messages", messages, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", null, {});
    await queryInterface.bulkInsert("Messages", null, {});
  }
};
