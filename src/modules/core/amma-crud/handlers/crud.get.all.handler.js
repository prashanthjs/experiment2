"use strict";
const Boom = require('boom');
const HandlerSchema = require('../schema/handler.schema');
const CrudCoreHandler = require('./crud.core.handler');
const Async = require('async');
class CrudGetAllHandler extends CrudCoreHandler.default {
    constructor() {
        super(...arguments);
        this.handler = (request, reply) => {
            const model = this.getModel();
            Async.series({
                results: (callback) => {
                    model.findAll(request.query, this.options.projections, callback);
                },
                total: (callback) => {
                    model.findAllCount(request.query, callback);
                }
            }, (err, results) => {
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                else {
                    const res = {
                        results: results.results,
                        meta: {
                            total: results.total
                        }
                    };
                    reply(res);
                }
            });
        };
        this.getSchema = () => {
            return HandlerSchema.default.CoreGetAllOption;
        };
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CrudGetAllHandler;
