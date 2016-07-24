"use strict";
const Boom = require('boom');
const HandlerSchema = require('../schema/handler.schema');
const CrudCoreHandler = require('./crud.core.handler');
const ObjectPath = require('object-path');
class CrudCreateHandler extends CrudCoreHandler.default {
    constructor(...args) {
        super(...args);
        this.defaultIdExistsMessage = 'Id exists already';
        this.handler = (request, reply) => {
            const model = this.getModel();
            const payload = request.payload;
            model.create(payload, (err, result) => {
                if (err) {
                    if ([11000, 11001].indexOf(err.code) !== -1) {
                        const message = ObjectPath.get(this.options, 'idExistsMessage', this.defaultIdExistsMessage);
                        reply(Boom.forbidden(message));
                    }
                    else {
                        reply(Boom.forbidden(err));
                    }
                }
                else {
                    model.findById(result._id, this.options.projections, (err, result) => {
                        if (err) {
                            reply(Boom.badImplementation(err));
                        }
                        else {
                            reply(result);
                        }
                    });
                }
            });
        };
        this.getSchema = () => {
            return HandlerSchema.default.CoreCreateOption;
        };
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CrudCreateHandler;
