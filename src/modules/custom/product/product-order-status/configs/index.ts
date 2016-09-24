module.exports = {
    app: {
        db: {
            schema: {
                'product-order-status': require('./schema')
            }
        }
    },
    routes: require('./routes'),
    services: require('./services.config')
};