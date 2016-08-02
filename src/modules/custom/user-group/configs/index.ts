module.exports = {
    app: {
        db: {
            schema: {
                'user-group': require('./schema')
            }
        }
    },
    routes: require('./routes'),
    services: require('./services.config')
};