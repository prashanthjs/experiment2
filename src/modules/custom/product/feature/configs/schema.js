"use strict";
const _ = require('lodash');
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
    items: [String]
};
schemaJson = _.merge(schemaJson, common);
module.exports = schemaJson;
