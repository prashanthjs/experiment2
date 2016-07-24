"use strict";
const Boom = require('boom');
const Joi = require('joi');
class StoreValidator {
    constructor() {
        this.storeValidator = (id, next) => {
            if (!id) {
                return next();
            }
            Joi.assert(id, Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())), 'Invalid data provided to hapi method');
            let ids = [];
            if (!Array.isArray(id)) {
                ids.push(id);
            }
            else {
                ids = id;
            }
            this.getDbService().getModel().find({
                _id: {
                    $in: ids
                }
            }, (err, docs) => {
                if (err) {
                    next(Boom.badImplementation(err));
                }
                else if (!docs) {
                    next(Boom.forbidden('Invalid store id(s) provided'));
                }
                else {
                    if (docs.length === ids.length) {
                        next();
                    }
                    else {
                        next(Boom.forbidden('Invalid store id(s) provided'));
                    }
                }
            });
        };
    }
    setServer(server) {
        this.server = server;
    }
    getDbService() {
        return this.server.settings.app.services.storeDbService;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StoreValidator;
