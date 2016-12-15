"use strict";
const _ = require('lodash');
const MongooseValidator = require('mongoose-validator');
const common = require('../../common/schema/common.schema');
const addressSchema = require('../../common/schema/address.schema');
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
    firstName: {
        type: String,
        require: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: MongooseValidator({
            validator: 'isEmail'
        })
    },
    contactNumber: {
        type: String,
        require: true
    },
    dob: {
        type: Date,
        require: false
    },
    gender: {
        type: String,
        require: false,
        validate: MongooseValidator({
            validator: 'matches',
            arguments: ['^(male|female|other)$'],
            message: 'Gender should be either male, female or other'
        })
    },
    userGroup: {
        type: String,
        require: true
    },
    isLocked: {
        type: Boolean,
        'default': false
    },
    isActive: {
        type: Boolean,
        'default': false
    },
    available: {
        store: {
            name: {
                type: String,
                require: true
            },
            availableToChildren: {
                type: Boolean,
                require: true
            }
        }
    },
    profilePic: {
        type: String,
        require: false
    },
    address: addressSchema
};
schemaJson = _.merge(schemaJson, common);
module.exports = schemaJson;
