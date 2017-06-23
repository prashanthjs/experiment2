"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Async = require("async");
const data = require('../configs/data/store.data.ts');
class StoreData {
    constructor() {
        this.init = (next) => {
            this.server.ext('onPreStart', this.findAndInsert);
            return next();
        };
        this.findAndInsert = (server, next) => {
            const model = this.getDbService().getModel();
            Async.eachSeries(data, (record, callback) => {
                model.findById(record._id, (err, result) => {
                    if (err) {
                        callback(err);
                    }
                    else if (result) {
                        callback();
                    }
                    else {
                        model.create(record, callback);
                    }
                });
            }, (err) => {
                return next(err);
            });
        };
    }
    setServer(server) {
        this.server = server;
    }
    getDbService() {
        return this.server.settings.app.services.storeDbService;
    }
}
exports.default = StoreData;
