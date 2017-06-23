"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const Hoek = require("hoek");
const _ = require("lodash");
const ObjectPath = require("object-path");
const Schema = require("../schema/schema");
class MethodLoader {
    loadMethods(cls, methodConfigs) {
        cls = Joi.attempt(cls, Joi.object().required(), 'Invalid class supplied');
        methodConfigs = methodConfigs || {};
        methodConfigs = Joi.attempt(methodConfigs, Joi.object(), 'Invalid method configs');
        _.forEach(methodConfigs, (methodConfig, methodName) => {
            this.loadMethod(cls, methodConfig, methodName);
        });
    }
    loadMethod(cls, methodConfig, name) {
        cls = Joi.attempt(cls, Joi.object().required(), 'Invalid class supplied');
        methodConfig = Joi.attempt(methodConfig, Schema.default.MethodSchema, 'Invalid method config');
        const methodName = methodConfig.methodName;
        const options = methodConfig.options;
        Hoek.assert(typeof cls[methodName] === 'function', 'Invalid service method');
        const func = ObjectPath.get(cls, methodName);
        this.server.method(name, func, options);
    }
    setServer(server) {
        this.server = server;
    }
}
exports.default = MethodLoader;
