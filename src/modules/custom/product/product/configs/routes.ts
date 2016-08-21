const ProductPayloadValidator = require('./payload.validation');

const ProductCollectionName = 'product';
export = {
    getAllProducts: {
        method: 'GET',
        path: '/products',
        config: {
            handler: {
                crudGetAll: {
                    collectionName: ProductCollectionName,
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
    getProduct: {
        method: 'GET',
        path: '/products/{id}',
        config: {
            handler: {
                crudGet: {
                    collectionName: ProductCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Product not found',
                    projections: {password: 0}
                }
            },
        }
    },
    createProduct: {
        method: 'POST',
        path: '/products',
        config: {
            handler: {
                crudCreate: {
                    collectionName: ProductCollectionName,
                    idExistsMessage: 'Product exists'
                }
            },
            validate: {
                payload: ProductPayloadValidator.createPayload
            }
        }
    },
    updateProduct: {
        method: 'PUT',
        path: '/products/{id}',
        config: {

            handler: {
                crudUpdate: {
                    collectionName: ProductCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Product not found'
                }
            },
            validate: {
                payload: ProductPayloadValidator.updatePayload
            }
        }
    },
    deleteProduct: {
        method: 'DELETE',
        path: '/products/{id}',
        config: {
            handler: {
                crudRemove: {
                    collectionName: ProductCollectionName,
                    idPath: 'params.id'
                }
            }
        }
    }
};