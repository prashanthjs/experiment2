const StorePayloadValidator = require('./payload.validation');
const StoreCollectionName = 'store';

export = {
    getAllStores: {
        method: 'GET',
        path: '/stores',
        config: {
            handler: {
                crudGetAll: {
                    collectionName: StoreCollectionName,
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
                    collectionName: StoreCollectionName,
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
                {method: 'storeValidator(payload.parent)'}
            ],
            handler: {
                crudCreate: {
                    collectionName: StoreCollectionName,
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
                {method: 'storeValidator(payload.parent)'}
            ],
            handler: {
                crudUpdate: {
                    collectionName: StoreCollectionName,
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
                    collectionName: StoreCollectionName,
                    idPath: 'params.id'
                }
            }
        }
    }
};