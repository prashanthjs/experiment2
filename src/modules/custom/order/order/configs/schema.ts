import _ = require('lodash');
import Mongoose = require('mongoose');
import Timestamps = require('mongoose-timestamp');
import MongooseValidator = require('mongoose-validator');
const common = require('../../../common/schema/common.schema');
const addressSchema = require('../../../common/schema/address.schema');

let schemaJson = {
    user: {
        name: {
            firstName: String,
            middleName: String,
            lastName: String
        },
        email: String,
        contactNumber: String,
        _id: String
    },
    store: {
        name: String,
        email: String,
        contactNumber: String,
        _id: String
    },
    address: {
        billing: addressSchema,
        shipping: addressSchema
    },
    inItems: [{
        _id: String,
        title: String,
        sku: String,
        price: {
            sell: Number,
            cost: Number,
            list: Number,
        },
        qty: Number,
        shipping: {
            weight: Number,
            box: {
                length: Number,
                width: Number,
                height: Number
            }
        },
        inItems: [{
            _id: String,
            title: String,
            price: {
                sell: Number,
                cost: Number,
                list: Number,
            },
        }],
        outItems: [{
            _id: String,
            title: String,
            price: {
                sell: Number,
                cost: Number,
                list: Number,
            },
        }],
        totalPrice: {
            sell: Number,
            cost: Number,
            list: Number,
        },
    }],
    outItems: [{
        _id: String,
        title: String,
        price: {
            sell: Number,
            cost: Number,
            list: Number,
        },
    }],

    status: String,
    notes: {
        customer: String,
        staff: String
    },
    totalPrice: {
        sell: Number,
        cost: Number,
        list: Number,
    },
    referenceNumber: String,
    payment: [{
        _id: String,
        title: String,
        reference: String,
        amount: Number,
        notes: {
            customer: String,
            staff: String
        },
        createdAt: {
            type: Date,
            'default': Date.now
        }
    }],
    shipping: [{
        _id: String,
        title: String,
        trackingNumber: String,
        notes: {
            customer: String,
            staff: String
        },
        createdAt: {
            type: Date,
            'default': Date.now
        }
    }]
};

schemaJson = _.merge(schemaJson, common);
module.exports = schemaJson;