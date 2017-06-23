"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boom = require("boom");
const Bcrypt = require("bcryptjs");
class UserPasswordEncryptService {
    constructor() {
        this.encryptPasswordRequestHandler = (request, reply) => {
            this.encryptPassword(request.payload.password, (err, hash) => {
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                request.payload.password = hash;
                reply({});
            });
        };
        this.encryptPassword = (password, next) => {
            Bcrypt.genSalt(this.getSalt(), (error, salt) => {
                Bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        return next(err);
                    }
                    return next(null, hash);
                });
            });
        };
    }
    getSalt() {
        return this.server.settings.app.auth.salt || 10;
    }
    setServer(server) {
        this.server = server;
    }
}
exports.default = UserPasswordEncryptService;
