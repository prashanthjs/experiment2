import Hapi = require("hapi");
import Boom = require("boom");
import Fs = require('fs-plus');
import Uuid = require('node-uuid');
import Path = require('path');
import NodeFs = require('fs');
import ObjectPath = require('object-path');


export interface ICallback {
    (err?:any, results?:any):any;
}

export interface IFileOptionCallback {
    (fileManager:FileManager, file:string, next:ICallback):any;
}

export interface IFilesOptionCallback {
    (fileManager:FileManager, next:ICallback):any;
}

export interface IOptions {
    uploadDir:string;
    min?:number;
    max?:number;
    ext:string[],
    minFileSize?:number;
    maxFileSize?:number;
    // string i.e, server method or validation function
    isValid?:string|IFilesOptionCallback;
    canUpload?:string|IFileOptionCallback;
    canRemove?:string|IFileOptionCallback;
}

class FileManager {


    private _server:Hapi.Server;
    private _type:string;
    private _token:string;

    createToken():string {
        return Uuid.v1();
    }

    removeFile(fileName:string):void {
        Fs.removeSync(Path.join(this.getUploadDir(), fileName));
    }

    getUniqueFileName(file:string):string {
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

    upload(file:NodeFs.ReadStream, fileName:string, callback:ICallback) {
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
            this.canUpload(path, (err)=> {
                if (err) {
                    this.removeFile(Path.parse(path).base);
                    return callback(err);
                }
                return callback(null, this.getFormattedFileResponse(path));
            });

        });

    }


    getFiles(extensions?:string[]):string[] {
        if (Fs.isDirectorySync(this.getUploadDir())) {
            return Fs.listSync(this.getUploadDir(), extensions)
        } else {
            return [];
        }
    }

    getUploadDir():string {
        const uploadDir = this.getOptions()['uploadDir'];
        return Path.join(uploadDir, this.token);
    }

    getViewUrl(fileName) {
        return this._server.settings.app.serverBaseUrl + Path.join('file', this.type, this.token, fileName);
    }

    getFormattedFilesResponse():Object[] {
        const files = this.getFiles();
        const result = [];
        files.forEach((file)=> {
            result.push(this.getFormattedFileResponse(file));
        });
        return result;
    }

    getFormattedFileResponse(file):Object {
        const baseFile = Path.parse(file).base;
        return {
            filename: baseFile,
            url: this.getViewUrl(baseFile)
        }
    }

    getOptions():IOptions {
        return this.server.settings.app.file[this.type];
    }


    canUpload(file, next:ICallback) {
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
            } else {
                canUpload(this, file, next);
            }
        }

    }

    hasValidExtensions(file):boolean {
        const parseData = Path.parse(file);
        const ext = parseData.ext;
        const validExtensions = this.getOptions().ext;
        if (validExtensions.indexOf(ext) != -1) {
            return true;
        }
        return false;
    }

    isValid(next:ICallback) {
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
            } else {
                isValid(this, next);
            }
        }

    }

    canRemove(file, next:ICallback) {
        const options = this.getOptions();
        if (ObjectPath.has(options, 'canRemove')) {
            const canRemove = options.canRemove;
            if (typeof canRemove === 'string') {
                return this._server.methods[canRemove](this, file, next);
            } else {
                canRemove(this, file, next);
            }
        }
    }

    get server():Hapi.Server {
        return this._server;
    }

    set server(value:Hapi.Server) {
        this._server = value;
    }

    get type():string {
        return this._type;
    }

    set type(value:string) {
        this._type = value;
    }

    get token():string {
        return this._token;
    }

    set token(value:string) {
        this._token = value;
    }

}

export default FileManager;

