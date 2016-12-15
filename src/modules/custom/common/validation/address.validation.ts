import Joi = require('joi');
module.exports = {
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string().optional().allow([null,'']),
    town: Joi.string().required(),
    county: Joi.string().allow([null,'']),
    country: Joi.string().required(),
    postcode: Joi.string().required()
};