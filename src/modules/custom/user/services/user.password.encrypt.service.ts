import Hapi = require('hapi');
import Boom = require('boom');
import Joi = require('joi');
import Bcrypt = require('bcryptjs');

export interface ICallback {
    (err?:any, results?:any):any;
}

export interface IRequest extends Hapi.IRequestHandler<Hapi.Request> {
    payload:{
        password:string;
    };
}

class UserPasswordEncryptService {

    private server:Hapi.Server;

    encryptPasswordRequestHandler = (request:IRequest, reply:Hapi.IReply) => {
        this.encryptPassword(request.payload.password, (err, hash:string) => {
            if (err) {
                return reply(Boom.badImplementation(err));
            }
            request.payload.password = hash;
            reply({});
        });
    };

    encryptPassword = (password:string, next:ICallback) => {
        Bcrypt.genSalt(this.getSalt(), (error, salt) => {
            Bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                }
                return next(null, hash);
            });
        });
    };

    getSalt():number {
        return this.server.settings.app.auth.salt || 10;
    }

    setServer(server:Hapi.Server):void {
        this.server = server;
    }

}

export default UserPasswordEncryptService;
