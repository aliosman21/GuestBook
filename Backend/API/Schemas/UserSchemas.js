const Joi = require("joi");

module.exports.userCreateSchema = Joi.object({
   password: Joi.string().min(6).max(50).required(),
   email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
   name: Joi.string()
      .regex(/^([a-z A-Z])+$/)
      .min(3)
      .max(50)
      .required(),
});

module.exports.userLoginSchema = Joi.object({
   password: Joi.string().min(6).max(50).regex(/^\d+$/).required(),
   email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
});

module.exports.usersFindSchema = Joi.object({
   limit: Joi.string().regex(/^\d+$/).required(),
   offset: Joi.string().regex(/^\d+$/).required(),
});