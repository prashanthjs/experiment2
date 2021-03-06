import Hapi = require('hapi');
import Boom = require('boom');
import Joi = require('joi');
import Mongoose = require('mongoose');

export interface ICallback {
    (err?:any, results?:any):any;
}

class ProductDbService {
    protected model:Mongoose.Model<Mongoose.Document>;

    getModel():Mongoose.Model<Mongoose.Document> {
        return Mongoose.model<Mongoose.Document>('product');
    }

}
export default ProductDbService;
