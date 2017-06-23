"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoleController {
    constructor() {
        this.getRolesAction = (request, reply) => {
            const roles = this.getRoleService().getRoles();
            const res = {
                result: roles,
                meta: {
                    total: roles.length
                }
            };
            reply(res);
        };
        this.setServer = (server) => {
            this.server = server;
        };
    }
    getRoleService() {
        return this.server.settings.app.services.roleService;
    }
}
exports.default = RoleController;
