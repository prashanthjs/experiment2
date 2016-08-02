"use strict";
module.exports = {
    getAllRoles: {
        method: 'GET',
        path: '/roles',
        config: {
            handler: 'getRolesAction'
        }
    },
};
