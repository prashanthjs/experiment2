import Hapi = require('hapi');
import Boom = require('boom');
import Joi = require('joi');
import Mongoose = require('mongoose');

export interface ICallback {
    (err?:any, results?:any):any;
}

class OrderDbService {
    protected model:Mongoose.Model<Mongoose.Document>;

    getModel():Mongoose.Model<Mongoose.Document> {
        return Mongoose.model<Mongoose.Document>('order');
    }

}
export default OrderDbService;
