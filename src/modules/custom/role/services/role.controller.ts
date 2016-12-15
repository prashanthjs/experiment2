import Hapi = require('hapi');
import ObjectPath = require('object-path');
import RoleService from "./role.service";

class RoleController {

    protected server:Hapi.Server;

    getRolesAction = (request:Hapi.IRequestHandler<Hapi.Request>, reply:Hapi.IReply) => {
        const roles = this.getRoleService().getRoles();
        const res = {
            result: roles,
            meta: {
                total: roles.length
            }
        };
        reply(res);
    };

    getRoleService():RoleService {
        return this.server.settings.app.services.roleService;
    }

    setServer = (server:Hapi.Server) => {
        this.server = server;
    };

}

export default RoleController;