import Hapi = require('hapi');
import Boom = require('boom');
import Joi = require('joi');
import Bcrypt = require('bcrypt');
import Mongoose = require('mongoose');

export interface ICallback {
    (err?:any, results?:any):any;
}

class UserDbService {
    protected model:Mongoose.Model<Mongoose.Document>;

    getModel():Mongoose.Model<Mongoose.Document> {
        return Mongoose.model<Mongoose.Document>('user');
    }

    findByEmail(email:string, projections:string|Object, next:ICallback) {
        return this.getModel().findOne({email: email}, projections, next);
    }

}
export default UserDbService;
