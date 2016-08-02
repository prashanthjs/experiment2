"use strict";
module.exports = {
    roleController: {
        cls: require('../services/role.controller').default,
        methods: {
            getRolesAction: {
                methodName: 'getRolesAction'
            }
        }
    },
    roleService: {
        cls: require('../services/role.service').default
    }
};
