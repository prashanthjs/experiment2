import _ = require('lodash');
import Mongoose = require('mongoose');
import Timestamps = require('mongoose-timestamp');
import MongooseValidator = require('mongoose-validator');
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
    frontendStatus:  String,
    type: {
        type: String,
        require: false,
        validate: MongooseValidator({
            validator: 'matches',
            arguments: ['^(pending|completed|cancelled)$'],
            message: 'Gender should be either male, female or other'
        })
    },
    notify: {
        subject: String,
        bodyHtml: String,
        bodyText: String
    }
};

schemaJson = _.merge(schemaJson, common);
module.exports = schemaJson;