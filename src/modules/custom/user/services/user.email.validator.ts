import Hapi = require('hapi');
import Boom = require('boom');
import Joi = require('joi');
import Bcrypt = require('bcrypt');
import UserDbService from "./user.db.service";

export interface ICallback {
    (err?:any, results?:any):any;
}


class UserEmailValidator {

    private server:Hapi.Server;

    userEmailValidator = (id:string, email:string, next:ICallback) => {
        Joi.assert(email, Joi.string().required(), 'Invalid data provided to hapi method');
        this.getUserDbService().findByEmail(email, null, (err, result) => {
            if (err) {
                return next(err);
            }
            if (result) {
                if (id && result._id === id) {
                    return next();
                }
                return next(Boom.forbidden('Email already exists'));
            }
            return next();
        });
    };

    setServer(server:Hapi.Server):void {
        this.server = server;
    }

    getUserDbService():UserDbService {
        return this.server.settings.app.services.userDbService;
    }

}

export default UserEmailValidator;
