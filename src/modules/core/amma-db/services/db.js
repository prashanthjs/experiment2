"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");
const Timestamps = require("mongoose-timestamp");
const ObjectPath = require("object-path");
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
                options: Joi.object(),
                schema: Joi.object()
            }).required(), 'Invalid DB config');
            const db = Mongoose.connect(options.uri, options.options, (err) => {
                if (err) {
                    this.server.log('error', 'Could not connect to MongoDB! ' + options.uri + '\n');
                    next(err);
                }
                else {
                    this.loadModels();
                    this.server.log('success', 'Connected to MongoDB ' + options.uri + '\n');
                    next();
                }
            });
            this.server.settings.app.dbInstance = db;
        };
        this.loadModels = () => {
            _.forEach(this.getSchema(), (schema, key) => {
                this.addModel(schema, key);
            });
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
    getSchema() {
        const options = this.getOptions();
        return options.schema;
    }
    addModel(schemaJson, collectionName) {
        const schema = new Mongoose.Schema(schemaJson);
        schema.plugin(Timestamps);
        if (!ObjectPath.has(this.server.settings.app, 'model')) {
            this.server.settings.app.model = {};
        }
        this.server.settings.app.model[collectionName] = Mongoose.model(collectionName, schema);
    }
}
exports.default = Db;
