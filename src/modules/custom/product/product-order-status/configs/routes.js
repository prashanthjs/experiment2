"use strict";
const ProductOrderStatusPayloadValidator = require('./payload.validation');
const ProductOrderStatusCollectionName = 'product-order-status';
module.exports = {
    getAllProductOrderStatuses: {
        method: 'GET',
        path: '/product-order-statuses',
        config: {
            handler: {
                crudGetAll: {
                    collectionName: ProductOrderStatusCollectionName,
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
    getProductOrderStatus: {
        method: 'GET',
        path: '/product-order-statuses/{id}',
        config: {
            handler: {
                crudGet: {
                    collectionName: ProductOrderStatusCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'ProductOrderStatus not found',
                    projections: { password: 0 }
                }
            },
        }
    },
    createProductOrderStatus: {
        method: 'POST',
        path: '/product-order-statuses',
        config: {
            handler: {
                crudCreate: {
                    collectionName: ProductOrderStatusCollectionName,
                    idExistsMessage: 'ProductOrderStatus exists'
                }
            },
            validate: {
                payload: ProductOrderStatusPayloadValidator.createPayload
            }
        }
    },
    updateProductOrderStatus: {
        method: 'PUT',
        path: '/product-order-statuses/{id}',
        config: {
            handler: {
                crudUpdate: {
                    collectionName: ProductOrderStatusCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'ProductOrderStatus not found'
                }
            },
            validate: {
                payload: ProductOrderStatusPayloadValidator.updatePayload
            }
        }
    },
    deleteProductOrderStatus: {
        method: 'DELETE',
        path: '/product-order-statuses/{id}',
        config: {
            handler: {
                crudRemove: {
                    collectionName: ProductOrderStatusCollectionName,
                    idPath: 'params.id'
                }
            }
        }
    }
};
