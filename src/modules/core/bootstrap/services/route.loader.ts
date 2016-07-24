import Hapi = require('hapi');
import Joi = require('joi');
import _ = require('lodash');

export interface IRouteLoader {
    setServer(server:Hapi.Server):void;
    loadRoutes(routes?:Object):void;
}

class RouteLoader implements IRouteLoader {
    private server:Hapi.Server;

    setServer(server:Hapi.Server):void {
        this.server = server;
    }

    loadRoutes(routes?:Object):void {
        routes = routes || {};
        routes = Joi.attempt(routes, Joi.object().required(), 'Invalid class supplied');
        let routesArray = [];
        _.forEach(routes, (route:Hapi.IRouteConfiguration, routeName:string)=> {
            //route['config']['id'] = routeName;
            routesArray.push(route);
        });
        this.server.route(routesArray);
    }

}

export default RouteLoader;