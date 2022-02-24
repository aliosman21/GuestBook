const db = require("../../db/models/index");

module.exports.findMessages = async (queryInfo) => {
   try {
      const result = await db.Message.findAndCountAll({
         offset: Number(queryInfo.offset * queryInfo.limit),
         limit: Number(queryInfo.limit),
         where: {
            ToUserId: queryInfo.id,
         },
         attributes: ["id", "content"],
      });
      return result;
   } catch (err) {
      console.error(`Get messages with ${JSON.stringify(queryInfo)} failed with `, err);
      return [];
   }
};
