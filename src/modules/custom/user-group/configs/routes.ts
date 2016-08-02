const UserGroupPayloadValidator = require('./payload.validation');
const Joi = require('joi');

const UserGroupCollectionName = 'user-group';
export = {
    getAllUserGroups: {
        method: 'GET',
        path: '/user-groups',
        config: {
            handler: {
                crudGetAll: {
                    collectionName: UserGroupCollectionName
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
    getUserGroup: {
        method: 'GET',
        path: '/user-groups/{id}',
        config: {
            handler: {
                crudGet: {
                    collectionName: UserGroupCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'User Group not found'
                }
            },
        }
    },
    createUserGroup: {
        method: 'POST',
        path: '/user-groups',
        config: {
            handler: {
                crudCreate: {
                    collectionName: UserGroupCollectionName,
                    idExistsMessage: 'User Group exists'
                }
            },
            validate: {
                payload: UserGroupPayloadValidator.createPayload
            }
        }
    },
    updateUserGroup: {
        method: 'PUT',
        path: '/user-groups/{id}',
        config: {
            handler: {
                crudUpdate: {
                    collectionName: UserGroupCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Store not found'
                }
            },
            validate: {
                payload: UserGroupPayloadValidator.updatePayload
            }
        }
    },
    deleteUserGroup: {
        method: 'DELETE',
        path: '/user-groups/{id}',
        config: {
            handler: {
                crudRemove: {
                    collectionName: UserGroupCollectionName,
                    idPath: 'params.id'
                }
            }
        }
    }
};