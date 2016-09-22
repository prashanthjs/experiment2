module.exports = {
    app: {
        db: {
            schema: {
                'product-order': require('./schema')
            }
        },
    },
    routes: require('./routes'),
    services: require('./services.config')
};