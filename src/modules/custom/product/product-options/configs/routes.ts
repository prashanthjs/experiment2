const FeaturePayloadValidator = require('./payload.validation');

const FeatureCollectionName = 'feature';
export = {
    getAllFeatures: {
        method: 'GET',
        path: '/features',
        config: {
            handler: {
                crudGetAll: {
                    collectionName: FeatureCollectionName,
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
    getFeature: {
        method: 'GET',
        path: '/features/{id}',
        config: {
            handler: {
                crudGet: {
                    collectionName: FeatureCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Feature not found',
                    projections: {password: 0}
                }
            },
        }
    },
    createFeature: {
        method: 'POST',
        path: '/features',
        config: {
            handler: {
                crudCreate: {
                    collectionName: FeatureCollectionName,
                    idExistsMessage: 'Feature exists'
                }
            },
            validate: {
                payload: FeaturePayloadValidator.createPayload
            }
        }
    },
    updateFeature: {
        method: 'PUT',
        path: '/features/{id}',
        config: {

            handler: {
                crudUpdate: {
                    collectionName: FeatureCollectionName,
                    idPath: 'params.id',
                    notFoundMessage: 'Feature not found'
                }
            },
            validate: {
                payload: FeaturePayloadValidator.updatePayload
            }
        }
    },
    deleteFeature: {
        method: 'DELETE',
        path: '/features/{id}',
        config: {
            handler: {
                crudRemove: {
                    collectionName: FeatureCollectionName,
                    idPath: 'params.id'
                }
            }
        }
    }
};