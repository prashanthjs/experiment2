"use strict";
const _ = require('lodash');
const Mongoose = require('mongoose');
const MongooseValidator = require('mongoose-validator');
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
    items: [{
            name: String,
            title: String,
            description: String,
            addon: Mongoose.Schema.Types.Mixed
        }]
};
schemaJson = _.merge(schemaJson, common);
module.exports = schemaJson;
