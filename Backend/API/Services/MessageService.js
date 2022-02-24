const messageRepository = require("../Repository/MessageRepository");

module.exports.getMessages = async (queryInfo) => {
   return await messageRepository.findMessages(queryInfo);
};
