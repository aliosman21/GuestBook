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
