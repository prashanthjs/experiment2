"use strict";
module.exports = {
    storeDbService: {
        cls: require('../services/store.db.service').default
    },
    storeValidator: {
        cls: require('../services/store.validator').default,
        methods: {
            storeValidator: {
                methodName: 'storeValidator'
            }
        }
    }
};
