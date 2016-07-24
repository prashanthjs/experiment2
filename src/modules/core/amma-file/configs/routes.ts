import Joi = require('joi');

export = {
    createFileToken: {
        method: 'GET',
        path: '/file/{type}',
        config: {
            handler: 'createFileTokenAction'
        }
    },
    isValidFiles: {
        method: 'GET',
        path: '/file/{type}/{token}/is-valid',
        config: {
            handler: 'isValidFilesAction'
        }
    },
    getFiles: {
        method: 'GET',
        path: '/file/{type}/{token}',
        config: {
            handler: 'getFilesAction'
        }
    },
    viewFile: {
        method: 'GET',
        path: '/file/{type}/{token}/{fileName}',
        config: {
            handler: 'viewFileAction'
        }
    },
    uploadFile: {
        method: 'POST',
        path: '/file/{type}/{token}',
        config: {
            handler: 'uploadFileAction',
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                maxBytes: 1048576 * 10, // 10MB
            },
            validate: {
                payload: {
                    file: Joi.object().required()
                }
            },
        }
    },
    removeFile: {
        method: 'DELETE',
        path: '/file/{type}/{token}/{fileName}',
        config: {
            handler: 'removeFileAction'
        }
    },

};