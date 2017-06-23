"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const MongooseValidator = require("mongoose-validator");
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
    title: String,
    isActive: {
        type: Boolean,
        'default': false
    }
};
schemaJson = _.merge(schemaJson, common);
module.exports = schemaJson;
