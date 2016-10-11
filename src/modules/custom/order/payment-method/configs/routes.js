"use strict";
const PaymentMethodPayloadValidator = require('./payload.validation');
const PaymentMethodCollectionName = 'payment-method';
module.exports = {
    getAllProductPaymentMethods: {
        method: 'GET',
        path: '/payment-methods',
        config: {
            handler: {
                crudGetAll: {
                    collectionName: PaymentMethodCollectionName,
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
    getProductPaymentMethod: {
        method: 'GET',
        path: '/payment-methods/{id}',
        config: {
            handler: {
                crudGet: {
                    collectionName: PaymentMethodCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Payment method not found'
                }
            },
        }
    },
    createProductPaymentMethod: {
        method: 'POST',
        path: '/payment-methods',
        config: {
            handler: {
                crudCreate: {
                    collectionName: PaymentMethodCollectionName,
                    idExistsMessage: 'Payment method already exists'
                }
            },
            validate: {
                payload: PaymentMethodPayloadValidator.createPayload
            }
        }
    },
    updateProductPaymentMethod: {
        method: 'PUT',
        path: '/payment-methods/{id}',
        config: {
            handler: {
                crudUpdate: {
                    collectionName: PaymentMethodCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Payment method not found'
                }
            },
            validate: {
                payload: PaymentMethodPayloadValidator.updatePayload
            }
        }
    },
    deleteProductPaymentMethod: {
        method: 'DELETE',
        path: '/payment-methods/{id}',
        config: {
            handler: {
                crudRemove: {
                    collectionName: PaymentMethodCollectionName,
                    idPath: 'params.id'
                }
            }
        }
    }
};
