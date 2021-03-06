"use strict";
const Loader = require('./services/loader');
const EventLoader = require('./services/event.loader');
const MethodLoader = require('./services/method.loader');
const HandlerLoader = require('./services/handler.loader');
const ServiceLoader = require('./services/service.loader');
const RouteLoader = require('./services/route.loader');
const bootstrap = (server, modules, next) => {
    const eventLoader = new EventLoader.default();
    eventLoader.setServer(server);
    const methodLoader = new MethodLoader.default();
    methodLoader.setServer(server);
    const handlerLoader = new HandlerLoader.default();
    handlerLoader.setServer(server);
    const serviceLoader = new ServiceLoader.default();
    serviceLoader.setServer(server);
    serviceLoader.setEventLoader(eventLoader);
    serviceLoader.setHandlerLoader(handlerLoader);
    serviceLoader.setMethodLoader(methodLoader);
    const routeLoader = new RouteLoader.default();
    routeLoader.setServer(server);
    const loader = new Loader.default();
    loader.setServer(server);
    loader.setServiceLoader(serviceLoader);
    loader.setRouteLoader(routeLoader);
    loader.init(modules, next);
};
module.exports = bootstrap;
