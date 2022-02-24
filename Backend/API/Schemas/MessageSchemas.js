const Joi = require("joi");

module.exports.messagesFindSchema = Joi.object({
   limit: Joi.string().regex(/^\d+$/).required(),
   offset: Joi.string().regex(/^\d+$/).required(),
   id: Joi.string().regex(/^\d+$/).required(),
});

module.exports.messagesCreateSchema = Joi.object({
   content: Joi.string().max(200).required(),
   toId: Joi.number().required(),
});

module.exports.messagesEditSchema = Joi.object({
   content: Joi.string().max(200).required(),
   messageId: Joi.number().required(),
});
module.exports.messagesDeleteSchema = Joi.object({
   messageId: Joi.number().required()
});
