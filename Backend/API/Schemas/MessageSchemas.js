const Joi = require("joi");

module.exports.messagesFindSchema = Joi.object({
   limit: Joi.string().regex(/^\d+$/).required(),
   offset: Joi.string().regex(/^\d+$/).required()
});

module.exports.messagesCreateSchema = Joi.object({
   content: Joi.string().max(200).required(),
});

module.exports.messagesEditSchema = Joi.object({
   content: Joi.string().max(200).required(),
});
