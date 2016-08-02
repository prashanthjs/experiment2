"use strict";
const Joi = require('joi');
const CoreHandlerOption = Joi.object({
    collectionName: Joi.string().required(),
});
const CoreGetAllOption = Joi.object({
    collectionName: Joi.string().required(),
    projections: Joi.alternatives().try(Joi.string(), Joi.object())
});
const CoreGetOption = Joi.object({
    collectionName: Joi.string().required(),
    idPath: Joi.string().required(),
    notFoundMessage: Joi.string(),
    projections: Joi.alternatives().try(Joi.string(), Joi.object())
});
const CoreCreateOption = Joi.object({
    collectionName: Joi.string().required(),
    idExistsMessage: Joi.string(),
    projections: Joi.alternatives().try(Joi.string(), Joi.object())
});
const CoreUpdateOption = Joi.object({
    collectionName: Joi.string().required(),
    idPath: Joi.string().required(),
    notFoundMessage: Joi.string(),
    projections: Joi.alternatives().try(Joi.string(), Joi.object())
});
const CoreRemoveOption = Joi.object({
    collectionName: Joi.string().required(),
    idPath: Joi.string().required()
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    CoreHandlerOption: CoreHandlerOption,
    CoreGetAllOption: CoreGetAllOption,
    CoreGetOption: CoreGetOption,
    CoreCreateOption: CoreCreateOption,
    CoreUpdateOption: CoreUpdateOption,
    CoreRemoveOption: CoreRemoveOption
};
