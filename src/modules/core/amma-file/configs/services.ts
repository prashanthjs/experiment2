export = {
    fileUploadController: {
        cls: require('../services/file.upload.controller').default,
        methods: {
            isValidFilesAction: {
                methodName: 'isValidFilesAction'
            },
            createFileTokenAction: {
                methodName: 'createFileTokenAction'
            },
            getFilesAction: {
                methodName: 'getFilesAction'
            },
            uploadFileAction: {
                methodName: 'uploadFileAction'
            },
            removeFileAction: {
                methodName: 'removeFileAction'
            },
            viewFileAction: {
                methodName: 'viewFileAction'
            }
        }
    },
    fileManagerFactory: {
        cls: require('../services/file.manager.factory').default
    }
};