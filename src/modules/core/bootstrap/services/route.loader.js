"use strict";
const Joi = require('joi');
const _ = require('lodash');
class RouteLoader {
    setServer(server) {
        this.server = server;
    }
    loadRoutes(routes) {
        routes = routes || {};
        routes = Joi.attempt(routes, Joi.object().required(), 'Invalid class supplied');
        let routesArray = [];
        _.forEach(routes, (route, routeName) => {
            //route['config']['id'] = routeName;
            routesArray.push(route);
        });
        this.server.route(routesArray);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RouteLoader;
