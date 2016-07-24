import Hapi = require('hapi');
import Joi = require('joi');
import Hoek = require('hoek');
import _ = require('lodash');
import ObjectPath = require('object-path');
import Schema = require('../schema/schema');

export interface IMethodConfig {
    methodName:string;
    name:string;
    options?:Object;
}

export interface IMethodLoader {
    setServer(server:Hapi.Server):void;
    loadMethods(cls, methodConfigs?:Object):void;
    loadMethod(cls, methodConfig:IMethodConfig, methodName:string):void
}

class MethodLoader implements IMethodLoader {
    private server:Hapi.Server;

    loadMethods(cls, methodConfigs?:Object):void {
        cls = Joi.attempt(cls, Joi.object().required(), 'Invalid class supplied');
        methodConfigs = methodConfigs || {};
        methodConfigs = Joi.attempt(methodConfigs, Joi.object(), 'Invalid method configs');
        _.forEach(methodConfigs, (methodConfig:IMethodConfig, methodName:string)=> {
            this.loadMethod(cls, methodConfig, methodName);
        });
    }

    loadMethod(cls, methodConfig:IMethodConfig, name: string):void {
        cls = Joi.attempt(cls, Joi.object().required(), 'Invalid class supplied');
        methodConfig = Joi.attempt(methodConfig, Schema.default.MethodSchema, 'Invalid method config');
        const methodName = methodConfig.methodName;
        const options = methodConfig.options;
        Hoek.assert(typeof cls[methodName] === 'function', 'Invalid service method');
        const func:any = ObjectPath.get(cls, methodName);
        this.server.method(name, func, options);
    }

    setServer(server:Hapi.Server):void {
        this.server = server;
    }

}

export default MethodLoader;