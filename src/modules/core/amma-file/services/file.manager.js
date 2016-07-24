"use strict";
const Fs = require('fs-plus');
const Uuid = require('node-uuid');
const Path = require('path');
const ObjectPath = require('object-path');
class FileManager {
    createToken() {
        return Uuid.v1();
    }
    removeFile(fileName) {
        Fs.removeSync(Path.join(this.getUploadDir(), fileName));
    }
    getUniqueFileName(file) {
        const parseData = Path.parse(file);
        const dir = parseData.dir;
        let fileName = parseData.name;
        const ext = parseData.ext;
        let i = 1;
        fileName = fileName.replace(/[^a-zA-Z0-9_-]/g, '');
        file = Path.join(dir, fileName + ext);
        while (Fs.isFileSync(file)) {
            file = Path.join(dir, fileName + '_' + i + ext);
            i = i + 1;
        }
        return file;
    }
    upload(file, fileName, callback) {
        const uploadDir = this.getUploadDir();
        Fs.makeTreeSync(uploadDir);
        const path = this.getUniqueFileName(Path.join(uploadDir, fileName));
        if (!this.hasValidExtensions(path)) {
            return callback('Invalid Extensions');
        }
        const fileStream = Fs.createWriteStream(path);
        fileStream.on('error', (err) => {
            return callback(err);
        });
        file.pipe(fileStream);
        file.on('end', (err) => {
            if (err) {
                this.removeFile(Path.parse(path).base);
                return callback(err);
            }
            this.canUpload(path, (err) => {
                if (err) {
                    this.removeFile(Path.parse(path).base);
                    return callback(err);
                }
                return callback(null, this.getFormattedFileResponse(path));
            });
        });
    }
    getFiles(extensions) {
        if (Fs.isDirectorySync(this.getUploadDir())) {
            return Fs.listSync(this.getUploadDir(), extensions);
        }
        else {
            return [];
        }
    }
    getUploadDir() {
        const uploadDir = this.getOptions()['uploadDir'];
        return Path.join(uploadDir, this.token);
    }
    getViewUrl(fileName) {
        return this._server.settings.app.serverBaseUrl + Path.join('file', this.type, this.token, fileName);
    }
    getFormattedFilesResponse() {
        const files = this.getFiles();
        const result = [];
        files.forEach((file) => {
            result.push(this.getFormattedFileResponse(file));
        });
        return result;
    }
    getFormattedFileResponse(file) {
        const baseFile = Path.parse(file).base;
        return {
            filename: baseFile,
            url: this.getViewUrl(baseFile)
        };
    }
    getOptions() {
        return this.server.settings.app.file[this.type];
    }
    canUpload(file, next) {
        const stat = Fs.statSync(file);
        const options = this.getOptions();
        if (ObjectPath.has(options, 'minFileSize') && options.minFileSize > stat.size) {
            return next('Invalid File Min Size');
        }
        if (ObjectPath.has(options, 'maxFileSize') && options.maxFileSize < stat.size) {
            return next('Invalid File Max Size');
        }
        if (ObjectPath.has(options, 'max') && options.max < this.getFiles().length) {
            return next('Max files Limit exceeded');
        }
        if (ObjectPath.has(options, 'canUpload')) {
            const canUpload = options.canUpload;
            if (typeof canUpload === 'string') {
                return this._server.methods[canUpload](this, file, next);
            }
            else {
                canUpload(this, file, next);
            }
        }
    }
    hasValidExtensions(file) {
        const parseData = Path.parse(file);
        const ext = parseData.ext;
        const validExtensions = this.getOptions().ext;
        if (validExtensions.indexOf(ext) != -1) {
            return true;
        }
        return false;
    }
    isValid(next) {
        const options = this.getOptions();
        if (ObjectPath.has(options, 'min') && options.min > this.getFiles().length) {
            return next('Min files Limit not met');
        }
        if (ObjectPath.has(options, 'max') && options.max < this.getFiles().length) {
            return next('Max files Limit exceeded');
        }
        if (ObjectPath.has(options, 'isValid')) {
            const isValid = options.isValid;
            if (typeof isValid === 'string') {
                return this._server.methods[isValid](this, next);
            }
            else {
                isValid(this, next);
            }
        }
    }
    canRemove(file, next) {
        const options = this.getOptions();
        if (ObjectPath.has(options, 'canRemove')) {
            const canRemove = options.canRemove;
            if (typeof canRemove === 'string') {
                return this._server.methods[canRemove](this, file, next);
            }
            else {
                canRemove(this, file, next);
            }
        }
    }
    get server() {
        return this._server;
    }
    set server(value) {
        this._server = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get token() {
        return this._token;
    }
    set token(value) {
        this._token = value;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileManager;
