import _ = require('lodash');
import Mongoose = require('mongoose');
import MongooseValidator = require('mongoose-validator');
const addressSchema = require('../../../common/schema/address.schema');
const common = require('../../../common/schema/common.schema');


let schemaJson = {
    _id: {
        type: String,
        unique: true,
        require: true,
        validate: MongooseValidator({
            validator: 'isAlphanumeric',
            message: 'should contain alpha-numeric characters only'
        })
    },
    title: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        validate: MongooseValidator({
            validator: 'isEmail',
            passIfEmpty: true,
            message: 'Not a valid email'
        })
    },
    website: {
        type: String
    },
    contactNumber: String,
    parent: String,
    address: addressSchema,
    description: String,
    isActive: {
        type: Boolean,
        'default': true
    },
    isLocked: {
        type: Boolean,
        'default': false
    }
};

schemaJson = _.merge(schemaJson, common);
module.exports = schemaJson;