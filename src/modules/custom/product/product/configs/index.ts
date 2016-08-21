module.exports = {
    app: {
        db: {
            schema: {
                'product': require('./schema')
            }
        },
        auth:{
            salt: 10
        },
        file: {
            product: {
                uploadDir: __dirname + '/../' + 'storage',
                min: 0,
                max: 9,
                ext: ['.jpg', '.jpeg', '.png', '.gif'],
                minFileSize: 1048576/4,
                maxFileSize: 1048576 * 10,
                // string i.e, server method or validation function
                isValid: (fileManager, next) => {
                    return next();
                },
                canUpload: (fileManager, file, next) => {
                    return next();
                },
                canRemove: (fileManager, file, next) => {
                    next();
                }
            }
        }
    },
    routes: require('./routes'),
    services: require('./services.config')
};