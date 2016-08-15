import Hapi = require('hapi');
import Boom = require('boom');
import Joi = require('joi');
import Bcrypt = require('bcrypt');
import Mongoose = require('mongoose');


const Schema = require('../configs/schema/store.schema');

export interface ICallback {
    (err?:any, results?:any): any;
}

export interface IStoreDbService {
    getModel():Mongoose.Model<Mongoose.Document>;
    findById(id:string, projections:string|Object, next:ICallback):void;
}

class StoreDbService implements IStoreDbService {

    protected model:Mongoose.Model<Mongoose.Document>;

    getModel():Mongoose.Model<Mongoose.Document> {
        return Mongoose.model<Mongoose.Document>('store');
    }

    findById(id:string, projections:string|Object, next:ICallback):void {
        this.getModel().findById(id, projections, next);
    }

}

export default StoreDbService;
