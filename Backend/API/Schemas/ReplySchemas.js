const Joi = require("joi");

module.exports.repliesFindSchema = Joi.object({
   limit: Joi.string().regex(/^\d+$/).required(),
   offset: Joi.string().regex(/^\d+$/).required(),
});
module.exports.replyCreateSchema = Joi.object({
   content: Joi.string().max(200).required(),
});
