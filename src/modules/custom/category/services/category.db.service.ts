import Hapi = require('hapi');
import Boom = require('boom');
import Joi = require('joi');
import Mongoose = require('mongoose');


export interface ICallback {
    (err?:any, results?:any): any;
}

export interface ICategoryDbService {
    getModel():Mongoose.Model<Mongoose.Document>;
    findById(id:string, projections:string|Object, next:ICallback):void;
}

class CategoryDbService implements ICategoryDbService {

    protected model:Mongoose.Model<Mongoose.Document>;

    getModel():Mongoose.Model<Mongoose.Document> {
        return Mongoose.model<Mongoose.Document>('category');
    }

    findById(id:string, projections:string|Object, next:ICallback):void {
        this.getModel().findById(id, projections, next);
    }

}

export default CategoryDbService;
