import Hapi = require('hapi');
import Items = require('items');
import ObjectPath = require('object-path');
import Schema = require('../schema/schema');
import Joi = require('joi');
import MethodLoader = require('./method.loader');
import EventLoader = require('./event.loader');
import HandlerLoader = require('./handler.loader');
import _ = require('lodash');

export interface IServiceConfig {
    cls:()=>{};
    methods?:Object;
    handlers?:Object;
    events?:Object;
}

export interface ICallback {
    (err?:any, results?:any):any;
}

export interface IServiceLoader {
    setServer(server:Hapi.Server):void;
    loadServices(serviceConfig:Object, next:ICallback):void;
    loadService(serviceName:string, serviceConfig:IServiceConfig, callBackArray:any[]):void;
    loadCallbacks(callbackArray:any[], next:ICallback):void;
    setMethodLoader(methodLoader:MethodLoader.IMethodLoader):void;
    setEventLoader(eventLoader:EventLoader.IEventLoader):void;
    setHandlerLoader(handlerLoader:HandlerLoader.IHandlerLoader):void;
}

class ServiceLoader implements IServiceLoader {

    private server:Hapi.Server;
    private methodLoader:MethodLoader.IMethodLoader;
    private eventLoader:EventLoader.IEventLoader;
    private handlerLoader:HandlerLoader.IHandlerLoader;
    private servicesKeyPath = 'settings.app.services';


    loadServices(serviceConfig:Object, next:ICallback):void {
        serviceConfig = serviceConfig || {};
        const callBackArray = [];
        serviceConfig = Joi.attempt(serviceConfig, Joi.object(), 'Invalid service configs');
        _.forEach(serviceConfig, (service:IServiceConfig, name:string)=> {
            this.loadService(name, service, callBackArray);
        });

        this.loadCallbacks(callBackArray, next);
    }

    loadService(serviceName:string, serviceConfig:IServiceConfig, callBackArray:any[]):void {
        serviceConfig = Joi.attempt(serviceConfig, Schema.default.ServiceSchema, 'Invalid service config');
        const ServiceClass:any = serviceConfig.cls;
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

    loadCallbacks(callbackArray:any[], next:ICallback):void {
        callbackArray = Joi.attempt(callbackArray, Joi.array().items(Joi.func()), 'Invalid callback array');
        if (callbackArray.length) {
            Items.serial(callbackArray, (item, done:ICallback) => {
                item(done)
            }, (error?:any) => {
                if (error) {
                    next(error);
                } else {
                    next();
                }

            });
        } else {
            next();
        }
    }

    setServer(server:Hapi.Server):void {
        this.server = server;
    }

    setMethodLoader(methodLoader:MethodLoader.IMethodLoader):void {
        this.methodLoader = methodLoader;
    }

    setEventLoader(eventLoader:EventLoader.IEventLoader):void {
        this.eventLoader = eventLoader;
    }

    setHandlerLoader(handlerLoader:HandlerLoader.IHandlerLoader):void {
        this.handlerLoader = handlerLoader;
    }

}
export default ServiceLoader;