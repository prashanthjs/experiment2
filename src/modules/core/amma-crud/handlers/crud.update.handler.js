"use strict";
const Boom = require('boom');
const HandlerSchema = require('../schema/handler.schema');
const CrudCoreHandler = require('./crud.core.handler');
const ObjectPath = require('object-path');
class CrudUpdateHandler extends CrudCoreHandler.default {
    constructor(...args) {
        super(...args);
        this.defaultNotFoundMessage = 'Not found';
        this.handler = (request, reply) => {
            const model = this.getModel();
            const payload = request.payload;
            const id = ObjectPath.get(request, this.options.idPath, null);
            payload._id = id;
            model.findById(id, this.options.projections, (err, result) => {
                if (err) {
                    reply(Boom.badImplementation(err));
                }
                else if (!result) {
                    const message = ObjectPath.get(this.options, 'notFoundMessage', this.defaultNotFoundMessage);
                    reply(Boom.notFound(message));
                }
                else {
                    this.update(id, payload, reply);
                }
            });
        };
        this.update = (id, payload, reply) => {
            const model = this.getModel();
            model.findByIdAndUpdate(id, payload, (err, result) => {
                if (err) {
                    reply(Boom.forbidden(err));
                }
                else {
                    model.findById(id, this.options.projections, (err, result) => {
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
            return HandlerSchema.default.CoreUpdateOption;
        };
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CrudUpdateHandler;
