export = {
    app:{
        db: {
           schema: {
               store: require('./schema/store.schema')
           }
        }
    },
    routes: require('./routes/index'),
    services:  require('./services.config'),
};