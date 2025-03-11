const Joi = require("joi");

const userValidate = Joi.object({
    fullname: Joi.string().min(3).max(30).required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    contact: Joi.string().pattern(/^\d{10}$/).optional(),
    picture: Joi.object({
        filename: Joi.string().min(3).max(100).required(),
        url: Joi.string().uri().required()
    }).optional()
}).required();

module.exports = userValidate;
