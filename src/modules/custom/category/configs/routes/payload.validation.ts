import Joi = require('joi');
import _ = require('lodash');
const commonValidation = require('../../../common/validation/common.validation');

let createPayload = {
    _id: Joi.string().alphanum().required().min(2),
    title: Joi.string().required(),
    parent: Joi.string().allow('').optional(),
    description: Joi.string(),
    isActive: Joi.boolean()
};

let updatePayload = {
    _id: Joi.string().alphanum().required().min(2),
    title: Joi.string().required(),
    parent: Joi.string().allow('').optional(),
    description: Joi.string(),
    isActive: Joi.boolean()
};
_.merge(updatePayload, commonValidation);
_.merge(createPayload, commonValidation);
module.exports = {
    createPayload: createPayload,
    updatePayload: updatePayload
};
