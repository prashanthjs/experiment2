module.exports = {
    app: {
        db: {
            schema: {
                'shipping-method': require('./schema')
            }
        }
    },
    routes: require('./routes'),
    services: require('./services.config')
};
