"use strict";
const OrderStatusPayloadValidator = require('./payload.validation');
const OrderStatusCollectionName = 'order-status';
module.exports = {
    getAllProductOrderStatuses: {
        method: 'GET',
        path: '/order-statuses',
        config: {
            handler: {
                crudGetAll: {
                    collectionName: OrderStatusCollectionName,
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
        path: '/order-statuses/{id}',
        config: {
            handler: {
                crudGet: {
                    collectionName: OrderStatusCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Order status not found'
                }
            },
        }
    },
    createProductOrderStatus: {
        method: 'POST',
        path: '/order-statuses',
        config: {
            handler: {
                crudCreate: {
                    collectionName: OrderStatusCollectionName,
                    idExistsMessage: 'Order status already exists'
                }
            },
            validate: {
                payload: OrderStatusPayloadValidator.createPayload
            }
        }
    },
    updateProductOrderStatus: {
        method: 'PUT',
        path: '/order-statuses/{id}',
        config: {
            handler: {
                crudUpdate: {
                    collectionName: OrderStatusCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Order status not found'
                }
            },
            validate: {
                payload: OrderStatusPayloadValidator.updatePayload
            }
        }
    },
    deleteProductOrderStatus: {
        method: 'DELETE',
        path: '/order-statuses/{id}',
        config: {
            handler: {
                crudRemove: {
                    collectionName: OrderStatusCollectionName,
                    idPath: 'params.id'
                }
            }
        }
    }
};
