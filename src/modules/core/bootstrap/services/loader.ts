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
import Util = require('util');

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
        config = this.triggerMergedConfig(modules, config);
        config = Joi.attempt(config, Schema.default.ConfigSchema, 'Invalid config');
        Fs.writeFile(__dirname+'/../logs/config.log', Util.inspect(config,  {depth:null }) , 'utf-8');
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
                const configPath = Path.join(modulePath, 'module');
                const Module = require(configPath);
                if(Module.getConfig){
                    config = this.deepMerge(config, Module.getConfig());
                }
            } catch (e) {
                this.server.log(e);
                this.server.log('info', key + ': Module does not exist' + modulePath);
            }
        });
        return config;
    }

    protected triggerMergedConfig(modules, config){
        _.forEach(modules, (modulePath:string, key:string)=> {
            try {
                const configPath = Path.join(modulePath, 'module');
                const Module = require(configPath);

                if(Module.postConfig){
                    config = Module.postConfig(config);
                }
            } catch (e) {
                console.log(e);
                this.server.log('info', key + ': Module does not exist' + modulePath);
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
