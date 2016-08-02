import Mongoose = require('mongoose');
import Hapi = require('hapi');
import Joi = require('joi');
import _ = require('lodash');
import Timestamps = require('mongoose-timestamp');
import ObjectPath = require('object-path');

export interface IDbOptions {
    uri:string,
    options?:Object
}

export interface ICallback {
    (err?:any, results?:any):any;
}

export interface IDb {
    getOptions():IDbOptions;
    connectDb(next:(err?:any, result?:any) => any):any;
    disconnectDb(next:(err?:any, result?:any) => any):any;
}

class Db implements IDb {
    protected server:Hapi.Server;

    getOptions():IDbOptions {
        return this.server.settings.app.db;
    }

    getSchema():IDbOptions {
        const options:any = this.getOptions();
        return options.schema;
    }

    setServer = (server:Hapi.Server) => {
        this.server = server;
    };

    init = (next)=> {
        this.connectDb(next);
    };

    connectDb = (next:ICallback) => {
        let options = this.getOptions();
        options = Joi.attempt(options, Joi.object({
            uri: Joi.string().required(),
            options: Joi.object(),
            schema: Joi.object()
        }).required(), 'Invalid DB config');
        const db = Mongoose.connect(options.uri, options.options, (err:any) => {
            if (err) {
                this.server.log('error', 'Could not connect to MongoDB! ' + options.uri + '\n');
                next(err);
            } else {
                this.loadModels();
                this.server.log('success', 'Connected to MongoDB ' + options.uri + '\n');
                next();
            }
        });
        this.server.settings.app.dbInstance = db;
    };

    loadModels = () => {
        _.forEach(this.getSchema(), (schema:Object, key:string)=> {
            this.addModel(schema, key);
        });
    };

    private addModel(schemaJson, collectionName) {
        const schema = new Mongoose.Schema(schemaJson);
        schema.plugin(Timestamps);
        if (!ObjectPath.has(this.server.settings.app,'model')) {
            this.server.settings.app.model = {};
        }
        this.server.settings.app.model[collectionName] = Mongoose.model(collectionName, schema);
    }

    disconnectDb = (next:(err?:any, result?:any) => any):any => {
        Mongoose.disconnect((err) => {
            this.server.log('info', 'Disconnected from MongoDB.');
            return next();
        });
    };

}

export default Db;
