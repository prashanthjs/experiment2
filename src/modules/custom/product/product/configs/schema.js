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
    sku: {
        type: String,
        require: true
    },
    categories: [String],
    price: {
        sell: {
            type: Number,
            require: true
        },
        cost: {
            type: Number,
            require: false
        },
        list: {
            type: Number,
            require: false
        },
    },
    promoText: {
        type: String,
        require: false
    },
    shortDescription: {
        type: String,
        require: false
    },
    description: {
        type: String,
        require: false
    },
    imageToken: {
        type: String,
        require: false
    },
    inventory: {
        stock: {
            type: Number,
            require: true,
            'default': -1
        },
        quantity: {
            min: {
                type: Number,
                require: true,
                'default': 0
            },
            max: {
                type: Number,
                require: true,
                'default': -1
            },
            step: {
                type: Number,
                require: true,
                'default': 1
            }
        }
    },
    features: [String],
    productOption: {
        options: [String],
        combinations: [{
                name: {
                    type: String,
                    require: true
                },
                sku: {
                    type: String,
                    require: true
                },
                price: {
                    sell: {
                        type: Number,
                        require: true
                    },
                    cost: {
                        type: Number,
                        require: false
                    },
                    list: {
                        type: Number,
                        require: false
                    },
                    isPercentage: {
                        type: Number,
                        require: true,
                        'default': false
                    }
                },
                inventory: {
                    stock: {
                        type: Number,
                        require: true,
                        'default': -1
                    },
                    quantity: {
                        min: {
                            type: Number,
                            require: true,
                            'default': 0
                        },
                        max: {
                            type: Number,
                            require: true,
                            'default': -1
                        }
                    }
                },
            }]
    },
    productAddons: [{
            addon: String,
            combinations: [{
                    name: {
                        type: String,
                        require: true
                    },
                    sku: {
                        type: String,
                        require: true
                    },
                    price: {
                        adjustSell: {
                            type: Number,
                            require: true
                        },
                        adjustCost: {
                            type: Number,
                            require: false
                        },
                        adjustList: {
                            type: Number,
                            require: false
                        },
                        isPercentage: {
                            type: Number,
                            require: true,
                            'default': false
                        }
                    },
                }]
        }],
    shipping: {
        weight: {
            type: Number,
            require: false,
            'default': -1
        },
        freeShipping: {
            type: Boolean,
            'default': false
        },
        box: {
            length: {
                type: Number,
                require: false,
                'default': -1
            },
            width: {
                type: Number,
                require: false,
                'default': -1
            },
            height: {
                type: Number,
                require: false,
                'default': -1
            }
        }
    },
    quantityDiscounts: [{
            min: {
                type: Number,
                require: false,
                'default': 1
            },
            max: {
                type: Number,
                require: false,
                'default': -1
            },
            value: {
                type: Number,
                require: false,
                'default': 0
            },
            isPercentage: {
                type: Boolean,
                require: false,
                'default': false
            }
        }],
    tags: [String],
    available: {
        store: {
            name: {
                type: String,
                require: true,
                'default': 'all'
            },
            availableToChildren: {
                type: Boolean,
                require: true
            }
        },
        userGroup: [String]
    },
    isActive: {
        type: Boolean,
        'default': false
    },
};
schemaJson = _.merge(schemaJson, common);
module.exports = schemaJson;
