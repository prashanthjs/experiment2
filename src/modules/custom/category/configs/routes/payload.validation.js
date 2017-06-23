"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const _ = require("lodash");
const commonValidation = require('../../../common/validation/common.validation');
let createPayload = {
    _id: Joi.string().alphanum().required().min(2),
    title: Joi.string().required(),
    parent: Joi.string().allow(['', null]).optional(),
    description: Joi.string().allow(['', null]).optional(),
    isActive: Joi.boolean(),
    images: Joi.array().items(Joi.string())
};
let updatePayload = _.clone(createPayload);
delete updatePayload._id;
_.merge(updatePayload, commonValidation);
_.merge(createPayload, commonValidation);
module.exports = {
    createPayload: createPayload,
    updatePayload: updatePayload
};
