import Hapi = require('hapi');
import Joi = require('joi');
import _ = require('lodash');
import Hoek = require('hoek');
import ObjectPath = require('object-path');
import Schema = require('../schema/schema');

export interface IEventConfig {
    methodName:string;
    type:string;
}

export interface IEventLoader {
    setServer(server:Hapi.Server):void;
    loadEvents(cls, eventConfig?:Object):void;
    loadEvent(cls, event:IEventConfig, eventName:string):void;
}

class EventLoader implements IEventLoader {
    private server:Hapi.Server;

    loadEvents(cls, eventConfig?:Object):void {
        cls = Joi.attempt(cls, Joi.object().required(), 'Invalid class supplied');
        eventConfig = eventConfig || {};
        eventConfig = Joi.attempt(eventConfig, Joi.object(), 'Invalid event configs');
        _.forEach(eventConfig, (event:IEventConfig, eventName:string)=> {
            this.loadEvent(cls, event, eventName);
        });
    }

    loadEvent(cls, event:IEventConfig, eventName:string):void {
        cls = Joi.attempt(cls, Joi.object().required(), 'Invalid class supplied');
        event = Joi.attempt(event, Schema.default.EventSchema, 'Invalid event config');
        const methodName = event.methodName;
        const type = event.type;
        Hoek.assert(typeof cls[methodName] === 'function', 'Invalid event handler');
        const func:any = ObjectPath.get(cls, methodName);
        this.server.on(type, func);
    }

    setServer(server:Hapi.Server):void {
        this.server = server;
    }

}
export default EventLoader;