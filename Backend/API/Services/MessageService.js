const messageRepository = require("../Repository/MessageRepository");

module.exports.getMessages = async (queryInfo) => {
   return await messageRepository.findMessages(queryInfo);
};

module.exports.addMessage = async (fromId, messageInfo) => {
   return await messageRepository.createMessage(fromId, messageInfo);
};
