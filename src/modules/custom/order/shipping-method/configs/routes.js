"use strict";
const ShippingMethodPayloadValidator = require('./payload.validation');
const ShippingMethodCollectionName = 'shipping-method';
module.exports = {
    getAllProductShippingMethods: {
        method: 'GET',
        path: '/shipping-methods',
        config: {
            handler: {
                crudGetAll: {
                    collectionName: ShippingMethodCollectionName,
                }
            },
            plugins: {
                hal: {
                    embedded: {
                        result: {
                            path: 'results',
                            href: './{item._id}'
                        }
                    }
                }
            }
        }
    },
    getProductShippingMethod: {
        method: 'GET',
        path: '/shipping-methods/{id}',
        config: {
            handler: {
                crudGet: {
                    collectionName: ShippingMethodCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Shipping method not found'
                }
            },
        }
    },
    createProductShippingMethod: {
        method: 'POST',
        path: '/shipping-methods',
        config: {
            handler: {
                crudCreate: {
                    collectionName: ShippingMethodCollectionName,
                    idExistsMessage: 'Shipping method already exists'
                }
            },
            validate: {
                payload: ShippingMethodPayloadValidator.createPayload
            }
        }
    },
    updateProductShippingMethod: {
        method: 'PUT',
        path: '/shipping-methods/{id}',
        config: {
            handler: {
                crudUpdate: {
                    collectionName: ShippingMethodCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Shipping method not found'
                }
            },
            validate: {
                payload: ShippingMethodPayloadValidator.updatePayload
            }
        }
    },
    deleteProductShippingMethod: {
        method: 'DELETE',
        path: '/shipping-methods/{id}',
        config: {
            handler: {
                crudRemove: {
                    collectionName: ShippingMethodCollectionName,
                    idPath: 'params.id'
                }
            }
        }
    }
};
