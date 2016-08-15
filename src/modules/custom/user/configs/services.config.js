"use strict";
module.exports = {
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
    },
    userChangePasswordController: {
        cls: require('../services/user.change.password.controller').default,
        methods: {
            userChangePasswordAction: {
                methodName: 'changePasswordAction'
            }
        }
    }
};
