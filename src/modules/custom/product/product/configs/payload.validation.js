"use strict";
const Joi = require('joi');
const _ = require('lodash');
const commonValidation = require('../../../common/validation/common.validation');
let createPayload = {
    _id: Joi.string().alphanum().required().min(2),
    title: Joi.string().required(),
    sku: Joi.string().required(),
    categories: Joi.array().items(Joi.string()).optional(),
    price: Joi.object().keys({
        sell: Joi.number().required(),
        cost: Joi.number().optional(),
        list: Joi.number().optional()
    }),
    promoText: Joi.string().empty().optional(),
    shortDescription: Joi.string().empty().optional(),
    description: Joi.string().empty().optional(),
    imageToken: Joi.string().empty().optional(),
    inventory: Joi.object().keys({
        stock: Joi.number().required(),
        quantity: Joi.object().keys({
            min: Joi.number().required(),
            max: Joi.number().required(),
            step: Joi.number().required()
        })
    }),
    features: Joi.array().items(Joi.string()).optional(),
    productOptions: Joi.object().keys({
        options: Joi.array().items(Joi.string()),
        combinations: Joi.array().items(Joi.object().keys({
            name: Joi.string().required(),
            sku: Joi.string().optional(),
            price: Joi.object().keys({
                sell: Joi.number().required(),
                cost: Joi.number().optional(),
                list: Joi.number().optional(),
                isPercentage: Joi.number().optional()
            }),
            inventory: Joi.object().keys({
                stock: Joi.number().required(),
                quantity: Joi.object().keys({
                    min: Joi.number().required(),
                    max: Joi.number().required(),
                })
            })
        }))
    }).optional(),
    productAddons: Joi.array().items(Joi.object().keys({
        addon: Joi.string().required(),
        combinations: Joi.array().items(Joi.object().keys({
            name: Joi.string().required(),
            price: Joi.object().keys({
                adjustSell: Joi.number().required(),
                adjustCost: Joi.number().optional(),
                adjustList: Joi.number().optional(),
                isPercentage: Joi.number().optional()
            }),
        })).optional()
    })).optional(),
    shipping: Joi.object().keys({
        weight: Joi.number().required(),
        freeShipping: Joi.boolean().optional(),
        box: Joi.object().keys({
            length: Joi.number().optional(),
            width: Joi.number().optional(),
            height: Joi.number().optional()
        })
    }).optional(),
    quantityDiscounts: Joi.array().items(Joi.object().keys({
        min: Joi.number().required(),
        max: Joi.number().required(),
        isPercentage: Joi.number().optional(),
        value: Joi.number().required()
    })).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    available: Joi.object().keys({
        store: Joi.object().keys({
            name: Joi.string().required(),
            availableToChildren: Joi.boolean().optional()
        }).required(),
        userGroup: Joi.array().items(Joi.string().required())
    }).required(),
    isActive: Joi.boolean().optional(),
};
let updatePayload = createPayload;
_.merge(updatePayload, commonValidation);
_.merge(createPayload, commonValidation);
module.exports = {
    createPayload: createPayload,
    updatePayload: updatePayload
};
