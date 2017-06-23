"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boom = require("boom");
const Joi = require("joi");
class UserEmailValidator {
    constructor() {
        this.userEmailValidator = (id, email, next) => {
            Joi.assert(email, Joi.string().required(), 'Invalid data provided to hapi method');
            this.getUserDbService().findByEmail(email, null, (err, result) => {
                if (err) {
                    return next(err);
                }
                if (result) {
                    if (id && result._id === id) {
                        return next();
                    }
                    return next(Boom.forbidden('Email already exists'));
                }
                return next();
            });
        };
    }
    setServer(server) {
        this.server = server;
    }
    getUserDbService() {
        return this.server.settings.app.services.userDbService;
    }
}
exports.default = UserEmailValidator;
