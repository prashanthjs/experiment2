"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boom = require("boom");
const ObjectPath = require("object-path");
const Path = require("path");
class FileUploadController {
    constructor() {
        this.createFileTokenAction = (request, reply) => {
            const type = ObjectPath.get(request, 'params.type', null);
            const fileManager = this.getFileManager(type, '');
            reply({ token: fileManager.createToken() });
        };
        this.getFilesAction = (request, reply) => {
            const token = ObjectPath.get(request, 'params.token', null);
            const type = ObjectPath.get(request, 'params.type', null);
            const fileManager = this.getFileManager(type, token);
            reply({ files: fileManager.getFormattedFilesResponse() });
        };
        this.uploadFileAction = (request, reply) => {
            const token = ObjectPath.get(request, 'params.token', null);
            const type = ObjectPath.get(request, 'params.type', null);
            const fileManager = this.getFileManager(type, token);
            const file = ObjectPath.get(request, 'payload.file');
            const fileName = ObjectPath.get(request, 'payload.file.hapi.filename', null);
            if (!token) {
                return reply(Boom.badData('Invalid Token'));
            }
            fileManager.upload(file, fileName, (error, result) => {
                if (error) {
                    return reply(Boom.badRequest(error));
                }
                return reply({
                    file: result,
                    headers: ObjectPath.get(request, 'payload.file.hapi.headers', {})
                });
            });
        };
        this.isValidFilesAction = (request, reply) => {
            const token = ObjectPath.get(request, 'params.token', null);
            const type = ObjectPath.get(request, 'params.type', null);
            const fileManager = this.getFileManager(type, token);
            fileManager.isValid((err) => {
                if (err) {
                    return reply({
                        success: false,
                        error: err
                    });
                }
                return reply({ success: true });
            });
        };
        this.removeFileAction = (request, reply) => {
            const token = ObjectPath.get(request, 'params.token', null);
            const type = ObjectPath.get(request, 'params.type', null);
            const fileManager = this.getFileManager(type, token);
            const fileName = ObjectPath.get(request, 'params.fileName', null);
            fileManager.canRemove(Path.join(fileManager.getUploadDir(), fileName), (err) => {
                if (err) {
                    return reply({ error: err, success: false });
                }
                fileManager.removeFile(fileName);
                return reply({ success: true });
            });
        };
        this.viewFileAction = (request, reply) => {
            const token = ObjectPath.get(request, 'params.token', null);
            const type = ObjectPath.get(request, 'params.type', null);
            const fileManager = this.getFileManager(type, token);
            const fileName = ObjectPath.get(request, 'params.fileName', null);
            const file = Path.join(fileManager.getUploadDir(), fileName);
            reply.file(file);
        };
        this.setServer = (server) => {
            this.server = server;
        };
    }
    getFileManager(type, token) {
        const fileManagerFactory = this.server.settings.app.services.fileManagerFactory;
        return fileManagerFactory.getInstance(type, token);
    }
}
exports.default = FileUploadController;
