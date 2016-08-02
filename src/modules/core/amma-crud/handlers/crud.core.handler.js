"use strict";
const Joi = require('joi');
const HandlerSchema = require('../schema/handler.schema');
class CrudCoreHandler {
    constructor() {
        this.handlerInit = (route, options) => {
            this.route = route;
            this.options = Joi.attempt(options, this.getSchema(), 'Invalid directory handler options (' + route.path + ')');
            const handler = this.handler;
            return handler;
        };
        this.handler = (request, reply) => {
            reply({});
        };
        this.getSchema = () => {
            return HandlerSchema.default.CoreHandlerOption;
        };
    }
    getModel() {
        if (!this.model) {
            const documentServiceFactory = this.server.settings.app.services.documentServiceFactory;
            this.model = documentServiceFactory.getDocumentService(this.options.collectionName);
        }
        return this.model;
    }
    setServer(server) {
        this.server = server;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CrudCoreHandler;
