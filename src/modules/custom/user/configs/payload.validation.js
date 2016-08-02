"use strict";
const Joi = require('joi');
const _ = require('lodash');
const commonValidation = require('../../common/validation/common.validation');
const addressValidation = require('../../common/validation/address.validation');
let createPayload = {
    _id: Joi.string().alphanum().required().min(2),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    middleName: Joi.string().optional(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    contactNumber: Joi.string().required(),
    dob: Joi.date().format('YYYY-MM-DD').optional(),
    userGroup: Joi.string().required(),
    gender: Joi.any().tags(['male', 'female', 'other']),
    isLocked: Joi.boolean().optional(),
    isActive: Joi.boolean().optional(),
    address: Joi.object().keys(addressValidation),
    available: Joi.object().keys({
        store: Joi.object().keys({
            name: Joi.string().required(),
            availableToChildren: Joi.boolean().optional()
        }).required()
    }).required()
};
let updatePayload = {
    _id: Joi.string().alphanum().required().min(2),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    middleName: Joi.string().optional(),
    email: Joi.string().email().required(),
    contactNumber: Joi.string().required(),
    dob: Joi.date().format('YYYY-MM-DD').optional(),
    userGroup: Joi.string().required(),
    gender: Joi.any().tags(['male', 'female', 'other']),
    isLocked: Joi.boolean().optional(),
    isActive: Joi.boolean().optional(),
    address: Joi.object().keys(addressValidation)
};
let changePasswordValidation = {
    _id: Joi.string().alphanum().required().min(2),
    password: Joi.string().required()
};
_.merge(updatePayload, commonValidation);
_.merge(createPayload, commonValidation);
module.exports = {
    createPayload: createPayload,
    updatePayload: updatePayload,
    changePasswordPayload: changePasswordValidation
};
