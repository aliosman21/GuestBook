const db = require("../../db/models/index");

module.exports.getUserByEmail = async ({email}) => {
   try {
      const user = await db.User.findOne({
         where: {
            email: email,
         },
         attributes: ["id", "email", "password"],
      });
      return user ? user : null;
   } catch (err) {
      console.error("Failed to get user by email");
      return null;
   }
};
module.exports.createUser = async (userInfo) => {
   try {
      await db.User.create({
         name: userInfo.name,
         email: userInfo.email,
         password: userInfo.password,
         avatar: userInfo.avatar
      });
      return true;
   } catch (err) {
      console.error("Failed to create user")
      return false;
   }
};

module.exports.findUsers = async (userId, queryInfo) => {
   try {
      const result = await db.User.findAndCountAll({
         offset: Number(queryInfo.offset * queryInfo.limit),
         limit: Number(queryInfo.limit),
         where: {
            id: {
               [db.Sequelize.Op.ne]: userId,
            },
         },
         attributes: ["id", "name", "avatar"],
      });
      return result;
   } catch (err) {
      console.error(`Get users with ${JSON.stringify(queryInfo)} failed with `, err);
      return [];
   }
};