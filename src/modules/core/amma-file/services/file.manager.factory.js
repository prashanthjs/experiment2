"use strict";
const file_manager_1 = require("./file.manager");
class FileManagerFactory {
    constructor() {
        this.setServer = (server) => {
            this.server = server;
        };
    }
    getInstance(type, token = '') {
        const fileManager = new file_manager_1.default();
        fileManager.server = this.server;
        fileManager.token = token;
        fileManager.type = type;
        return fileManager;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileManagerFactory;
