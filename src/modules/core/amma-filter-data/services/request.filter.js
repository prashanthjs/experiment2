"use strict";
const ObjectPath = require('object-path');
class RequestFilter {
    constructor() {
        this.setServer = (server) => {
            this.server = server;
        };
        this.filterPayload = (request, reply) => {
            if (request.method === 'put') {
                if (ObjectPath.has(request, 'payload._id')) {
                    ObjectPath.del(request, 'payload._id');
                }
                if (ObjectPath.has(request, 'payload.createdAt')) {
                    ObjectPath.del(request, 'payload.createdAt');
                }
                if (ObjectPath.has(request, 'payload.updatedAt')) {
                    ObjectPath.del(request, 'payload.updatedAt');
                }
            }
            reply.continue();
        };
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RequestFilter;
