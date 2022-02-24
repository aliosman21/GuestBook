'use strict';
const encryptionUtil = require("../../API/Util/encryption");
const faker = require("faker");
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [];
    for (let i = 0; i < 100; i++) {
       users.push({
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: await encryptionUtil.hashPassword(faker.datatype.string(10)),
          avatar: Math.random().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
       });
    }
     await queryInterface.bulkInsert("Users", users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", null, {});
  }
};
