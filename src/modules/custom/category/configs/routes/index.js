"use strict";
const CategoryPayloadValidator = require('./payload.validation');
const CategoryCollectionName = 'category';
module.exports = {
    getAllCategories: {
        method: 'GET',
        path: '/categories',
        config: {
            handler: {
                crudGetAll: {
                    collectionName: CategoryCollectionName,
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
    getCategory: {
        method: 'GET',
        path: '/categories/{id}',
        config: {
            handler: {
                crudGet: {
                    collectionName: CategoryCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Category not found'
                }
            },
        }
    },
    createCategory: {
        method: 'POST',
        path: '/categories',
        config: {
            pre: [
                { method: 'categoryValidator(payload.parent)' }
            ],
            handler: {
                crudCreate: {
                    collectionName: CategoryCollectionName,
                    idExistsMessage: 'category exists'
                }
            },
            validate: {
                payload: CategoryPayloadValidator.createPayload
            }
        }
    },
    updateCategory: {
        method: 'PUT',
        path: '/categories/{id}',
        config: {
            pre: [
                { method: 'categoryValidator(payload.parent)' }
            ],
            handler: {
                crudUpdate: {
                    collectionName: CategoryCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Category not found'
                }
            },
            validate: {
                payload: CategoryPayloadValidator.updatePayload
            }
        }
    },
    deleteCategory: {
        method: 'DELETE',
        path: '/categories/{id}',
        config: {
            handler: {
                crudRemove: {
                    collectionName: CategoryCollectionName,
                    idPath: 'params.id'
                }
            }
        }
    }
};
