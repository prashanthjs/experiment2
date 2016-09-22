"use strict";
const ProductPayloadValidator = require('./payload.validation');
const ProductOrderCollectionName = 'product-order';
module.exports = {
    getAllProductOrders: {
        method: 'GET',
        path: '/orders',
        config: {
            handler: {
                crudGetAll: {
                    collectionName: ProductOrderCollectionName,
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
    getProductOrder: {
        method: 'GET',
        path: '/orders/{id}',
        config: {
            handler: {
                crudGet: {
                    collectionName: ProductOrderCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Product not found',
                    projections: { password: 0 }
                }
            },
        }
    },
    createProductOrder: {
        method: 'POST',
        path: '/orders',
        config: {
            handler: {
                crudCreate: {
                    collectionName: ProductOrderCollectionName,
                    idExistsMessage: 'Order exists'
                }
            },
            validate: {
                payload: ProductPayloadValidator.createPayload
            }
        }
    },
    updateProductOrder: {
        method: 'PUT',
        path: '/orders/{id}',
        config: {
            handler: {
                crudUpdate: {
                    collectionName: ProductOrderCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Order not found'
                }
            },
            validate: {
                payload: ProductPayloadValidator.updatePayload
            }
        }
    },
    deleteProductOrder: {
        method: 'DELETE',
        path: '/orders/{id}',
        config: {
            handler: {
                crudRemove: {
                    collectionName: ProductOrderCollectionName,
                    idPath: 'params.id'
                }
            }
        }
    }
};
