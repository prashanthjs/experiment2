"use strict";
const TagPayloadValidator = require('./payload.validation');
const TagCollectionName = 'tag';
module.exports = {
    getAllTags: {
        method: 'GET',
        path: '/tags',
        config: {
            handler: {
                crudGetAll: {
                    collectionName: TagCollectionName,
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
    getTag: {
        method: 'GET',
        path: '/tags/{id}',
        config: {
            handler: {
                crudGet: {
                    collectionName: TagCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Tag not found',
                    projections: { password: 0 }
                }
            },
        }
    },
    createTag: {
        method: 'POST',
        path: '/tags',
        config: {
            handler: {
                crudCreate: {
                    collectionName: TagCollectionName,
                    idExistsMessage: 'Tag exists'
                }
            },
            validate: {
                payload: TagPayloadValidator.createPayload
            }
        }
    },
    updateTag: {
        method: 'PUT',
        path: '/tags/{id}',
        config: {
            handler: {
                crudUpdate: {
                    collectionName: TagCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Tag not found'
                }
            },
            validate: {
                payload: TagPayloadValidator.updatePayload
            }
        }
    },
    deleteTag: {
        method: 'DELETE',
        path: '/tags/{id}',
        config: {
            handler: {
                crudRemove: {
                    collectionName: TagCollectionName,
                    idPath: 'params.id'
                }
            }
        }
    }
};
