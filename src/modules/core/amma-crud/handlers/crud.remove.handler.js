"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boom = require("boom");
const HandlerSchema = require("../schema/handler.schema");
const CrudCoreHandler = require("./crud.core.handler");
const ObjectPath = require("object-path");
class CrudRemoveHandler extends CrudCoreHandler.default {
    constructor() {
        super(...arguments);
        this.handler = (request, reply) => {
            const model = this.getModel();
            const id = ObjectPath.get(request, this.options.idPath, null);
            model.findById(id, (err, result) => {
                if (err) {
                    reply(Boom.badImplementation(err));
                }
                else if (!result) {
                    reply({});
                }
                else if (ObjectPath.get(result, 'isLocked', false)) {
                    reply(Boom.badImplementation('Cannot be deleted'));
                }
                else {
                    result.remove(() => {
                        reply({});
                    });
                }
            });
        };
        this.getSchema = () => {
            return HandlerSchema.default.CoreRemoveOption;
        };
    }
}
exports.default = CrudRemoveHandler;
