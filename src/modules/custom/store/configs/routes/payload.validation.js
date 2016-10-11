"use strict";
const Joi = require('joi');
const _ = require('lodash');
const addressValidation = require('../../../common/validation/address.validation');
const commonValidation = require('../../../common/validation/common.validation');
let createPayload = {
    _id: Joi.string().alphanum().required().min(2),
    title: Joi.string().required(),
    email: Joi.string().email().required(),
    contactNumber: Joi.string().optional(),
    parent: Joi.string().allow('').optional(),
    website: Joi.string().uri(),
    address: Joi.object().keys(addressValidation),
    description: Joi.string(),
    logoToken: Joi.string().optional(),
    isActive: Joi.boolean(),
    isLocked: Joi.boolean()
};
let updatePayload = _.clone(createPayload);
delete updatePayload._id;
_.merge(updatePayload, commonValidation);
_.merge(createPayload, commonValidation);
module.exports = {
    createPayload: createPayload,
    updatePayload: updatePayload
};
