"use strict";
module.exports = {
    services: {
        requestFilterDataHandler: {
            cls: require('./services/request.filter').default,
            events: {
                filterDataOnRequest: {
                    methodName: 'filterPayload',
                    type: 'onPostAuth'
                }
            }
        }
    }
};
