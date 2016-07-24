import Hapi = require('hapi');
import Boom = require('boom');
import ObjectPath = require('object-path');
import Path = require('path');
import FileManager from "./file.manager";
import FileManagerFactory from "./file.manager.factory";

class FileUploadController {

    protected server:Hapi.Server;

    createFileTokenAction = (request:Hapi.IRequestHandler<Hapi.Request>, reply:Hapi.IReply) => {
        const type = ObjectPath.get(request, 'params.type', null);
        const fileManager = this.getFileManager(type, '');
        reply({token: fileManager.createToken()});
    };

    getFilesAction = (request:Hapi.IRequestHandler<Hapi.Request>, reply:Hapi.IReply) => {
        const token = ObjectPath.get(request, 'params.token', null);
        const type = ObjectPath.get(request, 'params.type', null);

        const fileManager = this.getFileManager(type, token);
        reply({files: fileManager.getFormattedFilesResponse()});
    };

    uploadFileAction = (request:Hapi.IRequestHandler<Hapi.Request>, reply:Hapi.IReply) => {
        const token = ObjectPath.get(request, 'params.token', null);
        const type = ObjectPath.get(request, 'params.type', null);
        const fileManager = this.getFileManager(type, token);

        const file:any = ObjectPath.get(request, 'payload.file');
        const fileName = ObjectPath.get(request, 'payload.file.hapi.filename', null);
        if (!token) {
            return reply(Boom.badData('Invalid Token'));
        }
        fileManager.upload(file, fileName, (error, result)=> {
            if (error) {
                return reply(Boom.badRequest(error));
            }
            return reply({
                file: result,
                headers: ObjectPath.get(request, 'payload.file.hapi.headers', {})
            });
        });

    };

    isValidFilesAction = (request:Hapi.IRequestHandler<Hapi.Request>, reply:Hapi.IReply) => {
        const token = ObjectPath.get(request, 'params.token', null);
        const type = ObjectPath.get(request, 'params.type', null);
        const fileManager = this.getFileManager(type, token);

        fileManager.isValid((err)=> {
            if (err) {
                return reply({
                    success: false,
                    error: err
                });
            }
            return reply({success: true});
        });
    };

    removeFileAction = (request:Hapi.IRequestHandler<Hapi.Request>, reply:Hapi.IReply) => {
        const token = ObjectPath.get(request, 'params.token', null);
        const type = ObjectPath.get(request, 'params.type', null);
        const fileManager = this.getFileManager(type, token);
        const fileName = ObjectPath.get(request, 'params.fileName', null);
        fileManager.canRemove(Path.join(fileManager.getUploadDir(), fileName), (err)=> {
            if (err) {
                return reply({error: err, success: false});
            }
            fileManager.removeFile(fileName);
            return reply({success: true});
        });
    };

    viewFileAction = (request:Hapi.IRequestHandler<Hapi.Request>, reply:any) => {
        const token = ObjectPath.get(request, 'params.token', null);
        const type = ObjectPath.get(request, 'params.type', null);
        const fileManager = this.getFileManager(type, token);
        const fileName = ObjectPath.get(request, 'params.fileName', null);
        const file = Path.join(fileManager.getUploadDir(), fileName);
        reply.file(file);
    };


    getFileManager(type:string, token:string):FileManager {
        const fileManagerFactory:FileManagerFactory = this.server.settings.app.services.fileManagerFactory;
        return fileManagerFactory.getInstance(type, token);
    }

    setServer = (server:Hapi.Server) => {
        this.server = server;
    };


}

export default FileUploadController;