export = {
    services: {
        documentServiceFactory: {
            cls: require('./services/document.service.factory').default
        },
        crudFactoryHandler: {
            cls: require('./handlers/crud.factory.handler').default,
            handlers: {
                crudGetAll: 'handlerGetAll',
                crudGet: 'handlerGet',
                crudUpdate: 'handlerUpdate',
                crudCreate: 'handlerCreate',
                crudRemove: 'handlerRemove'
            }
        }

    }
};