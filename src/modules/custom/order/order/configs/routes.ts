const OrderPayloadValidator = require('./payload.validation');

const OrderCollectionName = 'order';
export = {
    getAllProductOrders: {
        method: 'GET',
        path: '/orders',
        config: {
            handler: {
                crudGetAll: {
                    collectionName: OrderCollectionName,
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
                    collectionName: OrderCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Order not found'
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
                    collectionName: OrderCollectionName,
                    idExistsMessage: 'Order exists'
                }
            },
            validate: {
                payload: OrderPayloadValidator.createPayload
            }
        }
    },
    updateProductOrder: {
        method: 'PUT',
        path: '/orders/{id}',
        config: {

            handler: {
                crudUpdate: {
                    collectionName: OrderCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Order not found'
                }
            },
            validate: {
                payload: OrderPayloadValidator.updatePayload
            }
        }
    },
    deleteProductOrder: {
        method: 'DELETE',
        path: '/orders/{id}',
        config: {
            handler: {
                crudRemove: {
                    collectionName: OrderCollectionName,
                    idPath: 'params.id'
                }
            }
        }
    }
};