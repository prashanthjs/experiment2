"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boom = require("boom");
const ObjectPath = require("object-path");
class UserChangePasswordController {
    constructor() {
        this.changePasswordAction = (request, reply) => {
            const id = ObjectPath.get(request, 'params.id', null);
            const password = ObjectPath.get(request, 'payload.password', '');
            const dbService = this.getUserDbService();
            dbService.findByIdAndUpdatePassword(id, password, (err, result) => {
                if (!err) {
                    if (err) {
                        return reply(Boom.badImplementation(err));
                    }
                    return reply({ success: true });
                }
            });
        };
        this.setServer = (server) => {
            this.server = server;
        };
    }
    getUserDbService() {
        return this.server.settings.app.services.userDbService;
    }
}
exports.default = UserChangePasswordController;
