import Hapi = require('hapi');
import Hoek = require('hoek');
import ServiceLoader = require('./service.loader');
import RouteLoader = require('./route.loader');
import Schema = require('../schema/schema');
import Joi = require('joi');
import DeepMerge = require('deepmerge');
import _ = require('lodash');
import Path = require('path');
import Fs = require('fs');

export interface IConfig {
    app?:Object;
    services?:Object;
    routes?:Object;
}


export interface ICallback {
    (err?:any, results?:any):any;
}

export interface ILoader {
    init(modules:Object, next:ICallback):void;
    setServer(server:Hapi.Server):void;
    setServiceLoader(serviceLoader:ServiceLoader.IServiceLoader):void;
    setRouteLoader(routeLoader:RouteLoader.IRouteLoader):void;
}

export default class Loader implements ILoader {

    private server:Hapi.Server;
    private serviceLoader:ServiceLoader.IServiceLoader;
    private routeLoader:RouteLoader.IRouteLoader;

    init(modules:Object, next:ICallback) {
        let config = this.loadConfig(modules);
        config = Joi.attempt(config, Schema.default.ConfigSchema, 'Invalid config');
        this.loadAppConfig(config);
        this.serviceLoader.loadServices(config.services, (err)=> {
            this.routeLoader.loadRoutes(config.routes);
            next(err);
        });
    }

    protected loadConfig(modules:Object):IConfig {
        let config = {};
        _.forEach(modules, (modulePath:string, key:string)=> {
            try {
                const configPath = Path.join(modulePath, 'config.js');
                const stats = Fs.lstatSync(configPath);
                if (stats.isFile()) {
                    config = this.deepMerge(config, require(configPath));
                }
            } catch (e) {
                console.log(e);
                this.server.log('info', key + ': config file does not exist' + modulePath);
            }
        });
        return config;
    }

    protected loadAppConfig(config:IConfig):void {
        const app = config.app || {};
        if (this.server.settings.app) {
            this.server.settings.app = this.deepMerge(app, this.server.settings.app);
        }
        else {
            this.server.settings.app = app;
        }
    }

    setServer(server:Hapi.Server):void {
        this.server = server;
    }

    setServiceLoader(serviceLoader:ServiceLoader.IServiceLoader):void {
        this.serviceLoader = serviceLoader;
    }

    setRouteLoader(routeLoader:RouteLoader.IRouteLoader):void {
        this.routeLoader = routeLoader;
    }

    deepMerge(object1, object2):any {
        return DeepMerge(object1, object2);
    }

}
