module.exports = {
    app: {
        db: {
            schema: {
                'payment-method': require('./schema')
            }
        }
    },
    routes: require('./routes'),
    services: require('./services.config')
};
