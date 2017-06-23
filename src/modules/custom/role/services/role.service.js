"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const ObjectPath = require("object-path");
class RoleService {
    constructor() {
        this.setServer = (server) => {
            this.server = server;
        };
    }
    getRoles() {
        const roles = this.getRolesInAppObject();
        const rolesArray = [];
        _.forEach(roles, (role, key) => {
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
}
exports.default = RoleService;
