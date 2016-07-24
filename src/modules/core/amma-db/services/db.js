"use strict";
const Mongoose = require('mongoose');
const Joi = require('joi');
class Db {
    constructor() {
        this.setServer = (server) => {
            this.server = server;
        };
        this.init = (next) => {
            this.connectDb(next);
        };
        this.connectDb = (next) => {
            let options = this.getOptions();
            options = Joi.attempt(options, Joi.object({
                uri: Joi.string().required(),
                options: Joi.object()
            }).required(), 'Invalid DB config');
            const db = Mongoose.connect(options.uri, options.options, (err) => {
                if (err) {
                    this.server.log('error', 'Could not connect to MongoDB! ' + options.uri + '\n');
                    next(err);
                }
                else {
                    this.server.log('success', 'Connected to MongoDB ' + options.uri + '\n');
                    next();
                }
            });
            this.server.settings.app.dbInstance = db;
        };
        this.disconnectDb = (next) => {
            Mongoose.disconnect((err) => {
                this.server.log('info', 'Disconnected from MongoDB.');
                return next();
            });
        };
    }
    getOptions() {
        return this.server.settings.app.db;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Db;
