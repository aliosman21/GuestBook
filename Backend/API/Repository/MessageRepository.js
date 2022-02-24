const db = require("../../db/models/index");

module.exports.findMessages = async (queryInfo) => {
   try {
      const result = await db.Message.findAndCountAll({
         offset: Number(queryInfo.offset * queryInfo.limit),
         limit: Number(queryInfo.limit),
         where: {
            ToUserId: queryInfo.id,
         },
         include: [
            {
               model: db.User,
               as: "fromUser",
               attributes: ["id", "name", "avatar"],
            },
         ],
         attributes: ["id", "content"],
      });
      return result;
   } catch (err) {
      console.error(`Get messages with ${JSON.stringify(queryInfo)} failed with `, err);
      return [];
   }
};

module.exports.createMessage = async (fromId, messageInfo) => {
   try {
      await db.Message.create({
         content: messageInfo.content,
         FromUserId: fromId,
         ToUserId: messageInfo.toId,
      });
      return true;
   } catch (err) {
      console.error("Failed to create message");
      return false;
   }
};
module.exports.editMessage = async (fromId, messageInfo) => {
   try {
      await db.Message.update(
         { content: messageInfo.content },
         { where: { id: messageInfo.messageId, FromUserId: fromId } }
      );
      return true;
   } catch (err) {
      console.error("Failed to edit message");
      return false;
   }
};