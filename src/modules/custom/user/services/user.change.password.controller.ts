import Hapi = require('hapi');
import Boom = require('boom');
import ObjectPath = require('object-path');
import Path = require('path');
import UserDbService from "./user.db.service";

class UserChangePasswordController {

    protected server: Hapi.Server;

    changePasswordAction = (request: Hapi.IRequestHandler<Hapi.Request>, reply: Hapi.IReply) => {
        const id = ObjectPath.get(request, 'params.id', null);
        const password = ObjectPath.get(request, 'payload.password', '');

        const dbService = this.getUserDbService();

        dbService.findByIdAndUpdatePassword(id, password, (err, result)=> {
            if (!err) {
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                return reply({success: true});
            }
        });
    };


    getUserDbService(): UserDbService {
        return this.server.settings.app.services.userDbService;
    }

    setServer = (server: Hapi.Server) => {
        this.server = server;
    };

}

export default UserChangePasswordController;