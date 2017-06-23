"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const MethodSchema = Joi.object({
    methodName: Joi.string().required(),
    options: Joi.object()
});
const HandlerSchema = Joi.string();
const EventSchema = Joi.object({
    type: Joi.string().required(),
    methodName: Joi.string().required()
});
const ServiceSchema = Joi.object({
    cls: Joi.func().required(),
    methods: Joi.object(),
    handlers: Joi.object(),
    events: Joi.object()
});
const ConfigSchema = Joi.object({
    app: Joi.object(),
    services: Joi.object(),
    routes: Joi.object()
});
exports.default = {
    ServiceSchema: ServiceSchema,
    ConfigSchema: ConfigSchema,
    MethodSchema: MethodSchema,
    HandlerSchema: HandlerSchema,
    EventSchema: EventSchema
};
