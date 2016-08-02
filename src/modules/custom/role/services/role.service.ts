import Hapi = require('hapi');
import Boom = require('boom');
import _ = require('lodash');
import ObjectPath = require('object-path');

export interface IRole {
    _id?:string,
    title:string;
    description?:string;
}

class RoleService {

    protected server:Hapi.Server;

    getRoles():IRole[] {
        const roles = this.getRolesInAppObject();
        const rolesArray = [];
        _.forEach(roles, (role:IRole, key)=> {
            if (!ObjectPath.has(role, '_id')) {
                role._id = key;
            }
            rolesArray.push(role);
        });
        return rolesArray;
    }

    getRolesInAppObject() {
        return ObjectPath.get(this.server.settings.app, 'roles', {});
    }

    setServer = (server:Hapi.Server) => {
        this.server = server;
    };
}

export default RoleService;