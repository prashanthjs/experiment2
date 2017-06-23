"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const _ = require("lodash");
const commonValidation = require('../../common/validation/common.validation');
const addressValidation = require('../../common/validation/address.validation');
let createPayload = {
    _id: Joi.string().alphanum().required().min(2),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    middleName: Joi.string().optional().allow(['', null]),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    contactNumber: Joi.string().required(),
    dob: Joi.date().optional().allow(['', null]),
    userGroup: Joi.string().required(),
    gender: Joi.any().tags(['male', 'female', 'other']),
    isActive: Joi.boolean().optional(),
    address: Joi.object().keys(addressValidation),
    profilePic: Joi.string().optional().allow(['', null]),
    available: Joi.object().keys({
        store: Joi.object().keys({
            name: Joi.string().required(),
            availableToChildren: Joi.boolean().optional()
        }).required()
    }).required()
};
let updatePayload = _.clone(createPayload);
delete updatePayload._id;
delete updatePayload.password;
let changePasswordValidation = {
    password: Joi.string().required()
};
_.merge(updatePayload, commonValidation);
_.merge(createPayload, commonValidation);
module.exports = {
    createPayload: createPayload,
    updatePayload: updatePayload,
    changePasswordPayload: changePasswordValidation
};
