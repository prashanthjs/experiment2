"use strict";
const Schema = require('../schema/schema');
const Joi = require('joi');
const DeepMerge = require('deepmerge');
const _ = require('lodash');
const Path = require('path');
const Fs = require('fs');
const Util = require('util');
class Loader {
    init(modules, next) {
        let config = this.loadConfig(modules);
        config = this.triggerMergedConfig(modules, config);
        config = Joi.attempt(config, Schema.default.ConfigSchema, 'Invalid config');
        Fs.writeFile(__dirname + '/../logs/config.log', Util.inspect(config, { depth: null }), 'utf-8');
        this.loadAppConfig(config);
        this.serviceLoader.loadServices(config.services, (err) => {
            this.routeLoader.loadRoutes(config.routes);
            next(err);
        });
    }
    loadConfig(modules) {
        let config = {};
        _.forEach(modules, (modulePath, key) => {
            try {
                const configPath = Path.join(modulePath, 'module');
                const Module = require(configPath);
                if (Module.getConfig) {
                    config = this.deepMerge(config, Module.getConfig());
                }
            }
            catch (e) {
                this.server.log(e);
                this.server.log('info', key + ': Module does not exist' + modulePath);
            }
        });
        return config;
    }
    triggerMergedConfig(modules, config) {
        _.forEach(modules, (modulePath, key) => {
            try {
                const configPath = Path.join(modulePath, 'module');
                const Module = require(configPath);
                if (Module.postConfig) {
                    config = Module.postConfig(config);
                }
            }
            catch (e) {
                console.log(e);
                this.server.log('info', key + ': Module does not exist' + modulePath);
            }
        });
        return config;
    }
    loadAppConfig(config) {
        const app = config.app || {};
        if (this.server.settings.app) {
            this.server.settings.app = this.deepMerge(app, this.server.settings.app);
        }
        else {
            this.server.settings.app = app;
        }
        Fs.writeFile(__dirname + '/../logs/config-app.log', Util.inspect(this.server.settings.app, { depth: null }), 'utf-8');
    }
    setServer(server) {
        this.server = server;
    }
    setServiceLoader(serviceLoader) {
        this.serviceLoader = serviceLoader;
    }
    setRouteLoader(routeLoader) {
        this.routeLoader = routeLoader;
    }
    deepMerge(object1, object2) {
        return DeepMerge(object1, object2);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Loader;
