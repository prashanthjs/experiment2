import Joi = require('joi');
import _ = require('lodash');
const commonValidation = require('../../../common/validation/common.validation');
const addressValidation = require('../../../common/validation/address.validation');

let createPayload = {
    _id: Joi.string().optional(),
    user: Joi.object().required().keys({
        name: Joi.object().required().keys({
            firstName: Joi.string().alphanum().required(),
            middleName: Joi.string().alphanum().empty('').optional(),
            lastName: Joi.string().alphanum().required(),
        }),
        email: Joi.string().email().required(),
        contactNumber: Joi.string().alphanum().empty('').optional(),
        _id: Joi.string().alphanum().optional(),
    }),
    store: Joi.object().required().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        contactNumber: Joi.string().alphanum().empty('').optional(),
        _id: Joi.string().alphanum().optional(),
    }),
    address: Joi.object().optional().keys({
        shipping: Joi.object().optional().keys(addressValidation),
        billing: Joi.object().optional().keys(addressValidation)
    }),
    inItems: Joi.array().items(Joi.object().keys({
        _id: Joi.string().empty('').optional(),
        title: Joi.string().empty('').optional(),
        sku: Joi.string().empty('').optional(),
        price: Joi.object().keys({
            sell: Joi.number().required(),
            cost: Joi.number().optional(),
            list: Joi.number().optional()
        }).required(),
        shipping: Joi.object().keys({
            weight: Joi.number().required(),
            box: Joi.object().keys({
                length: Joi.number().optional(),
                width: Joi.number().optional(),
                height: Joi.number().optional()
            }).optional()
        }),
        qty: Joi.number().required(),
        inItems: Joi.array().items(Joi.object().keys({
            _id: Joi.string().empty('').optional(),
            title: Joi.string().empty('').optional(),
            price: Joi.object().keys({
                sell: Joi.number().required(),
                cost: Joi.number().optional(),
                list: Joi.number().optional()
            }).required(),
        })).optional(),
        outItems: Joi.array().items(Joi.object().keys({
            _id: Joi.string().empty('').optional(),
            title: Joi.string().empty('').optional(),
            price: Joi.object().keys({
                sell: Joi.number().required(),
                cost: Joi.number().optional(),
                list: Joi.number().optional()
            }).required(),
        })).optional(),
        totalPrice: Joi.object().keys({
            sell: Joi.number().optional(),
            cost: Joi.number().optional(),
            list: Joi.number().optional()
        }).optional()
    })).required(),
    outItems: Joi.array().items(Joi.object().keys({
        _id: Joi.string().empty('').optional(),
        title: Joi.string().empty('').optional(),
        price: Joi.object().keys({
            sell: Joi.number().required(),
            cost: Joi.number().optional(),
            list: Joi.number().optional()
        }).required(),
    })).optional(),
    status: Joi.string().required(),
    referenceNumber: Joi.string().required(),
    totalPrice: Joi.object().keys({
        sell: Joi.number().optional(),
        cost: Joi.number().optional(),
        list: Joi.number().optional()
    }).optional(),
    notes: Joi.object().keys({
        customer: Joi.string().empty('').optional(),
        staff: Joi.string().empty('').optional(),
    }).optional(),
    payment: Joi.array().items(Joi.object().keys({
        _id: Joi.string().empty('').optional(),
        title: Joi.string().empty('').optional(),
        reference: Joi.string().empty('').optional(),
        amount: Joi.number().optional(),
        createdAt: Joi.date().optional(),
        notes: Joi.object().keys({
            customer: Joi.string().empty('').optional(),
            staff: Joi.string().empty('').optional(),
        }).optional(),
    })).optional(),
    shipping: Joi.array().items(Joi.object().keys({
        _id: Joi.string().empty('').optional(),
        title: Joi.string().empty('').optional(),
        trackingNumber: Joi.string().empty('').optional(),
        createdAt: Joi.date().optional(),
        notes: Joi.object().keys({
            customer: Joi.string().empty('').optional(),
            staff: Joi.string().empty('').optional(),
        }).optional(),
    })).optional()
};

let updatePayload = createPayload;

_.merge(updatePayload, commonValidation);
_.merge(createPayload, commonValidation);
module.exports = {
    createPayload: createPayload,
    updatePayload: updatePayload
};
