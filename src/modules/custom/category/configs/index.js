"use strict";
module.exports = {
    app: {
        db: {
            schema: {
                category: require('./schema/category.schema')
            }
        }
    },
    routes: require('./routes/index'),
    services: require('./services.config'),
};
