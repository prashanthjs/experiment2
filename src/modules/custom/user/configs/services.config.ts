export = {
    userDbService: {
        cls: require('../services/user.db.service').default
    },
    userPasswordEncryptService: {
        cls: require('../services/user.password.encrypt.service').default,
        methods: {
            userEncryptPasswordRequestHandler: {
                methodName: 'encryptPasswordRequestHandler'
            }
        }
    },
    userEmailValidator: {
        cls: require('../services/user.email.validator').default,
        methods: {
            userEmailValidator: {
                methodName: 'userEmailValidator'
            }
        }
    }
};