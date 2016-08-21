module.exports = {
    app: {
        db: {
            schema: {
                'tag': require('./schema')
            }
        }
    },
    routes: require('./routes'),
    services: require('./services.config')
};