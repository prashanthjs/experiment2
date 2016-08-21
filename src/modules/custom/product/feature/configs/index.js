module.exports = {
    app: {
        db: {
            schema: {
                'feature': require('./schema')
            }
        }
    },
    routes: require('./routes'),
    services: require('./services.config')
};
