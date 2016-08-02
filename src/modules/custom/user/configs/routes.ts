const UserPayloadValidator = require('./payload.validation');

const UserCollectionName = 'user';
export = {
    getAllUsers: {
        method: 'GET',
        path: '/users',
        config: {
            handler: {
                crudGetAll: {
                    collectionName: UserCollectionName,
                    projections: {password: 0}
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
    getUser: {
        method: 'GET',
        path: '/users/{id}',
        config: {
            handler: {
                crudGet: {
                    collectionName: UserCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'User not found',
                    projections: {password: 0}
                }
            },
        }
    },
    createUser: {
        method: 'POST',
        path: '/users',
        config: {
            pre: [
                {method: 'userEncryptPasswordRequestHandler'},
                {method: 'userEmailValidator(null, payload.email)'}
            ],
            handler: {
                crudCreate: {
                    collectionName: UserCollectionName,
                    idExistsMessage: 'User exists'
                }
            },
            validate: {
                payload: UserPayloadValidator.createPayload
            }
        }
    },
    updateUser: {
        method: 'PUT',
        path: '/users/{id}',
        config: {
            pre: [
                {method: 'userEncryptPasswordRequestHandler'},
                {method: 'userEmailValidator(payload._id, payload.email)'}
            ],
            handler: {
                crudUpdate: {
                    collectionName: UserCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'User not found'
                }
            },
            validate: {
                payload: UserPayloadValidator.updatePayload
            }
        }
    },
    deleteUser: {
        method: 'DELETE',
        path: '/users/{id}',
        config: {
            handler: {
                crudRemove: {
                    collectionName: UserCollectionName,
                    idPath: 'params.id'
                }
            }
        }
    }
};