"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boom = require("boom");
const HandlerSchema = require("../schema/handler.schema");
const CrudCoreHandler = require("./crud.core.handler");
const ObjectPath = require("object-path");
class CrudGetHandler extends CrudCoreHandler.default {
    constructor() {
        super(...arguments);
        this.defaultNotFoundMessage = 'Not found';
        this.handler = (request, reply) => {
            const model = this.getModel();
            const id = ObjectPath.get(request, this.options.idPath, null);
            model.findById(id, this.options.projections, (err, result) => {
                if (err) {
                    reply(Boom.badImplementation(err));
                }
                else if (!result) {
                    const message = ObjectPath.get(this.options, 'notFoundMessage', this.defaultNotFoundMessage);
                    reply(Boom.notFound(message));
                }
                else {
                    reply(result);
                }
            });
        };
        this.getSchema = () => {
            return HandlerSchema.default.CoreGetOption;
        };
    }
}
exports.default = CrudGetHandler;
