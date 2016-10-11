import Mongoose = require('mongoose');
import Hapi = require('hapi');
import Joi = require('joi');
import _ = require('lodash');
import Timestamps = require('mongoose-timestamp');
import ObjectPath = require('object-path');


class RequestFilter {
    protected server: Hapi.Server;
    setServer = (server: Hapi.Server) => {
        this.server = server;
    };

    filterPayload = (request, reply)=> {

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

export default RequestFilter;
