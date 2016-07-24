import _ = require('lodash');
import Hapi = require('hapi');
import Loader = require('./services/loader');
import EventLoader = require('./services/event.loader');
import MethodLoader = require('./services/method.loader');
import HandlerLoader = require('./services/handler.loader');
import ServiceLoader = require('./services/service.loader');
import RouteLoader = require('./services/route.loader');

const bootstrap = (server: Hapi.Server, modules:Object, next) => {
   const eventLoader:EventLoader.IEventLoader = new EventLoader.default();
   eventLoader.setServer(server);

   const methodLoader:MethodLoader.IMethodLoader= new MethodLoader.default();
   methodLoader.setServer(server);

   const handlerLoader:HandlerLoader.IHandlerLoader= new HandlerLoader.default();
   handlerLoader.setServer(server);
   
   const serviceLoader: ServiceLoader.IServiceLoader = new ServiceLoader.default();
   serviceLoader.setServer(server);
   serviceLoader.setEventLoader(eventLoader);
   serviceLoader.setHandlerLoader(handlerLoader);
   serviceLoader.setMethodLoader(methodLoader);
   
   const routeLoader: RouteLoader.IRouteLoader = new RouteLoader.default();
   routeLoader.setServer(server);
   
   const loader:Loader.ILoader = new Loader.default();
   loader.setServer(server);
   loader.setServiceLoader(serviceLoader);
   loader.setRouteLoader(routeLoader);
   
   loader.init(modules, next);
   
};

export = bootstrap;