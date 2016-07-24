"use strict";
const Schema = require('../schema/schema');
const Joi = require('joi');
const DeepMerge = require('deepmerge');
const _ = require('lodash');
const Path = require('path');
const Fs = require('fs');
class Loader {
    init(modules, next) {
        let config = this.loadConfig(modules);
        config = Joi.attempt(config, Schema.default.ConfigSchema, 'Invalid config');
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
                const configPath = Path.join(modulePath, 'config.js');
                const stats = Fs.lstatSync(configPath);
                if (stats.isFile()) {
                    config = this.deepMerge(config, require(configPath));
                }
            }
            catch (e) {
                console.log(e);
                this.server.log('info', key + ': config file does not exist' + modulePath);
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
