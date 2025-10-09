const Joi = require('joi');

const profileSchema = Joi.object({
    plan: Joi.string().valid('premium').required()
});

module.exports = profileSchema;
