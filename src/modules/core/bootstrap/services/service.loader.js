"use strict";
const Items = require('items');
const ObjectPath = require('object-path');
const Schema = require('../schema/schema');
const Joi = require('joi');
const _ = require('lodash');
class ServiceLoader {
    constructor() {
        this.servicesKeyPath = 'settings.app.services';
    }
    loadServices(serviceConfig, next) {
        serviceConfig = serviceConfig || {};
        const callBackArray = [];
        serviceConfig = Joi.attempt(serviceConfig, Joi.object(), 'Invalid service configs');
        _.forEach(serviceConfig, (service, name) => {
            this.loadService(name, service, callBackArray);
        });
        this.loadCallbacks(callBackArray, next);
    }
    loadService(serviceName, serviceConfig, callBackArray) {
        serviceConfig = Joi.attempt(serviceConfig, Schema.default.ServiceSchema, 'Invalid service config');
        const ServiceClass = serviceConfig.cls;
        const cls = new ServiceClass();
        if (typeof cls.setServer === 'function') {
            cls.setServer(this.server);
        }
        if (typeof cls.init === 'function') {
            callBackArray.push(cls.init);
        }
        this.methodLoader.loadMethods(cls, serviceConfig.methods);
        this.handlerLoader.loadHandlers(cls, serviceConfig.handlers);
        this.eventLoader.loadEvents(cls, serviceConfig.events);
        ObjectPath.ensureExists(this.server, this.servicesKeyPath, {});
        ObjectPath.set(this.server, this.servicesKeyPath + '.' + serviceName, cls);
    }
    loadCallbacks(callbackArray, next) {
        callbackArray = Joi.attempt(callbackArray, Joi.array().items(Joi.func()), 'Invalid callback array');
        if (callbackArray.length) {
            Items.serial(callbackArray, (item, done) => {
                item(done);
            }, (error) => {
                if (error) {
                    next(error);
                }
                else {
                    next();
                }
            });
        }
        else {
            next();
        }
    }
    setServer(server) {
        this.server = server;
    }
    setMethodLoader(methodLoader) {
        this.methodLoader = methodLoader;
    }
    setEventLoader(eventLoader) {
        this.eventLoader = eventLoader;
    }
    setHandlerLoader(handlerLoader) {
        this.handlerLoader = handlerLoader;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServiceLoader;
