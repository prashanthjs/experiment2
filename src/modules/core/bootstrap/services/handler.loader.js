"use strict";
const Joi = require('joi');
const Hoek = require('hoek');
const _ = require('lodash');
const ObjectPath = require('object-path');
const Schema = require('../schema/schema');
class HandlerLoader {
    loadHandlers(cls, handlerConfig) {
        cls = Joi.attempt(cls, Joi.object().required(), 'Invalid class supplied');
        handlerConfig = handlerConfig || {};
        handlerConfig = Joi.attempt(handlerConfig, Joi.object(), 'Invalid handlers config');
        _.forEach(handlerConfig, (handler, handlerName) => {
            this.loadHandler(cls, handler, handlerName);
        });
    }
    loadHandler(cls, handler, handlerName) {
        cls = Joi.attempt(cls, Joi.object().required(), 'Invalid class supplied');
        handler = Joi.attempt(handler, Schema.default.HandlerSchema, 'Invalid handler config');
        Hoek.assert(typeof cls[handler] === 'function', 'Invalid handler method');
        const func = ObjectPath.get(cls, handler);
        this.server.handler(handlerName, func);
    }
    setServer(server) {
        this.server = server;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HandlerLoader;
