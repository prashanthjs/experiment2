module.exports = {
    app: {
        db: {
            schema: {
                'order-status': require('./schema')
            }
        }
    },
    routes: require('./routes'),
    services: require('./services.config')
};