"use strict";
const Joi = require('joi');
const _ = require('lodash');
const commonValidation = require('../../../common/validation/common.validation');
let createPayload = {
    _id: Joi.string().alphanum().required().min(2),
    title: Joi.string().required(),
    frontendStatus: Joi.string().required(),
    type: Joi.any().tags(['pending', 'completed', 'cancelled']),
    notify: Joi.object().keys({
        subject: Joi.string().required(),
        bodyHtml: Joi.string().required(),
        bodyText: Joi.string().empty('').optional()
    }).optional()
};
let updatePayload = createPayload;
_.merge(updatePayload, commonValidation);
_.merge(createPayload, commonValidation);
module.exports = {
    createPayload: createPayload,
    updatePayload: updatePayload
};
