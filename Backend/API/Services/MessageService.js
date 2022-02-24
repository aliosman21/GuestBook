const messageRepository = require("../Repository/MessageRepository");

module.exports.getMessages = async (queryInfo,userId) => {
   return await messageRepository.findMessages(queryInfo, userId);
};

module.exports.addMessage = async (fromId, messageInfo) => {
   return await messageRepository.createMessage(fromId, messageInfo);
};

module.exports.editMessage = async (fromId, messageInfo) => {
   return await messageRepository.editMessage(fromId, messageInfo);
};

module.exports.removeMessage = async (fromId, messageId) => {
   return await messageRepository.deleteMessage(fromId, messageId);
};
