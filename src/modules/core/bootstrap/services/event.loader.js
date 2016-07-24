"use strict";
const Joi = require('joi');
const _ = require('lodash');
const Hoek = require('hoek');
const ObjectPath = require('object-path');
const Schema = require('../schema/schema');
class EventLoader {
    loadEvents(cls, eventConfig) {
        cls = Joi.attempt(cls, Joi.object().required(), 'Invalid class supplied');
        eventConfig = eventConfig || {};
        eventConfig = Joi.attempt(eventConfig, Joi.object(), 'Invalid event configs');
        _.forEach(eventConfig, (event, eventName) => {
            this.loadEvent(cls, event, eventName);
        });
    }
    loadEvent(cls, event, eventName) {
        cls = Joi.attempt(cls, Joi.object().required(), 'Invalid class supplied');
        event = Joi.attempt(event, Schema.default.EventSchema, 'Invalid event config');
        const methodName = event.methodName;
        const type = event.type;
        Hoek.assert(typeof cls[methodName] === 'function', 'Invalid event handler');
        const func = ObjectPath.get(cls, methodName);
        this.server.on(type, func);
    }
    setServer(server) {
        this.server = server;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventLoader;
