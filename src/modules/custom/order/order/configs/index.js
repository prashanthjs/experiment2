module.exports = {
    app: {
        db: {
            schema: {
                'order': require('./schema')
            }
        },
    },
    routes: require('./routes'),
    services: require('./services.config')
};
