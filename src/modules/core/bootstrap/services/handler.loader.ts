import Hapi = require('hapi');
import Joi = require('joi');
import Hoek = require('hoek');
import _ = require('lodash');
import ObjectPath = require('object-path');
import Schema = require('../schema/schema');


export interface IHandlerLoader {
    setServer(server:Hapi.Server):void;
    loadHandlers(cls, handlerConfig?:Object):void;
    loadHandler(cls, handler:string, handlerName:string):void;
}


class HandlerLoader implements IHandlerLoader {
    private server:Hapi.Server;

    loadHandlers(cls, handlerConfig?:Object):void {
        cls = Joi.attempt(cls, Joi.object().required(), 'Invalid class supplied');
        handlerConfig = handlerConfig || {};
        handlerConfig = Joi.attempt(handlerConfig, Joi.object(), 'Invalid handlers config');
        _.forEach(handlerConfig, (handler:string, handlerName:string)=> {
            this.loadHandler(cls, handler, handlerName);
        });
    }

    loadHandler(cls, handler:string, handlerName:string):void {
        cls = Joi.attempt(cls, Joi.object().required(), 'Invalid class supplied');
        handler = Joi.attempt(handler, Schema.default.HandlerSchema, 'Invalid handler config');
        Hoek.assert(typeof cls[handler] === 'function', 'Invalid handler method');
        const func:any = ObjectPath.get(cls, handler);
        this.server.handler(handlerName, func);
    }

    setServer(server:Hapi.Server):void {
        this.server = server;
    }

}

export default HandlerLoader;