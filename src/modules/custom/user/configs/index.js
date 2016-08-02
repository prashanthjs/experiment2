module.exports = {
    app: {
        db: {
            schema: {
                'user': require('./schema')
            }
        },
        auth: {
            salt: 10
        }
    },
    routes: require('./routes'),
    services: require('./services.config')
};
