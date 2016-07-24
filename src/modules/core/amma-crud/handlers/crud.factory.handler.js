"use strict";
const CrudGetAllHandler = require('./crud.get.all.handler');
const CrudGetHandler = require('./crud.get.handler');
const CrudCreateHandler = require('./crud.create.handler');
const CrudRemoveHandler = require('./crud.remove.handler');
const CrudUpdateHandler = require('./crud.update.handler');
class CrudFactoryHandler {
    constructor() {
        this.handlerGetAll = (route, options) => {
            let cls = new CrudGetAllHandler.default();
            cls.setServer(this.server);
            return cls.handlerInit(route, options);
        };
        this.handlerGet = (route, options) => {
            let cls = new CrudGetHandler.default();
            cls.setServer(this.server);
            return cls.handlerInit(route, options);
        };
        this.handlerCreate = (route, options) => {
            let cls = new CrudCreateHandler.default();
            cls.setServer(this.server);
            return cls.handlerInit(route, options);
        };
        this.handlerUpdate = (route, options) => {
            let cls = new CrudUpdateHandler.default();
            cls.setServer(this.server);
            return cls.handlerInit(route, options);
        };
        this.handlerRemove = (route, options) => {
            let cls = new CrudRemoveHandler.default();
            cls.setServer(this.server);
            return cls.handlerInit(route, options);
        };
    }
    setServer(server) {
        this.server = server;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CrudFactoryHandler;
