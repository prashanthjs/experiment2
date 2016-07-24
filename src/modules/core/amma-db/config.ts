export = {
    services: {
        dbService: {
            cls: require('./services/db').default,
            methods: {
                connectDb: {
                    methodName: 'connectDb'
                },
                disconnectDb: {
                    methodName: 'disconnectDb'
                }
            }

        }
    }
};