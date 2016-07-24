import Hapi = require("hapi");
import Boom = require("boom");
import Fs = require('fs-plus');
import Uuid = require('node-uuid');
import Path = require('path');
import NodeFs = require('fs');
import FileManager from "./file.manager";

export interface ICallback {
    (err?:any, results?:any):any;
}

class FileManagerFactory {

    protected server:Hapi.Server;

    setServer = (server:Hapi.Server) => {
        this.server = server;
    };

    getInstance(type:string, token:string = ''):FileManager {
        const fileManager = new FileManager();
        fileManager.server = this.server;
        fileManager.token = token;
        fileManager.type = type;
        return fileManager;
    }

}

export default FileManagerFactory;

