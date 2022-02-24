const Joi = require("joi");

module.exports.messagesFindSchema = Joi.object({
   limit: Joi.string().regex(/^\d+$/).required(),
   offset: Joi.string().regex(/^\d+$/).required(),
   id: Joi.string().regex(/^\d+$/).required(),
});
