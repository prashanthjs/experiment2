"use strict";
const Joi = require('joi');
const _ = require('lodash');
const commonValidation = require('../../../common/validation/common.validation');
let createPayload = {
    _id: Joi.string().alphanum().required().min(2),
    title: Joi.string().required(),
    items: Joi.array().items(Joi.object().keys({
        name: Joi.string().required(),
        title: Joi.string().empty().optional(),
        description: Joi.string().empty().optional()
    })),
};
let updatePayload = createPayload;
_.merge(updatePayload, commonValidation);
_.merge(createPayload, commonValidation);
module.exports = {
    createPayload: createPayload,
    updatePayload: updatePayload
};
