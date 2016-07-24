"use strict";
const StoreSchema = require('../schema/store.schema');
const StorePayloadValidator = require('./payload.validation');
module.exports = {
    getAllStores: {
        method: 'GET',
        path: '/stores',
        config: {
            handler: {
                crudGetAll: {
                    collectionName: StoreSchema.collectionName,
                    schema: StoreSchema.schema,
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
    getStore: {
        method: 'GET',
        path: '/stores/{id}',
        config: {
            handler: {
                crudGet: {
                    collectionName: StoreSchema.collectionName,
                    schema: StoreSchema.schema,
                    idPath: 'params.id',
                    notFoundMessage: 'Store not found'
                }
            },
        }
    },
    createStore: {
        method: 'POST',
        path: '/stores',
        config: {
            pre: [
                { method: 'storeValidator(payload.parent)' }
            ],
            handler: {
                crudCreate: {
                    collectionName: StoreSchema.collectionName,
                    schema: StoreSchema.schema,
                    idExistsMessage: 'store exists'
                }
            },
            validate: {
                payload: StorePayloadValidator.createPayload
            }
        }
    },
    updateStore: {
        method: 'PUT',
        path: '/stores/{id}',
        config: {
            pre: [
                { method: 'storeValidator(payload.parent)' }
            ],
            handler: {
                crudUpdate: {
                    collectionName: StoreSchema.collectionName,
                    schema: StoreSchema.schema,
                    idPath: 'params.id',
                    notFoundMessage: 'Store not found'
                }
            },
            validate: {
                payload: StorePayloadValidator.updatePayload
            }
        }
    },
    deleteStore: {
        method: 'DELETE',
        path: '/stores/{id}',
        config: {
            handler: {
                crudRemove: {
                    collectionName: StoreSchema.collectionName,
                    schema: StoreSchema.schema,
                    idPath: 'params.id'
                }
            }
        }
    }
};
