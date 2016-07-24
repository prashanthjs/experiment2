"use strict";
const Glue = require('glue');
const Bootstrap = require('./modules/core/bootstrap');
const options = {
    relativeTo: __dirname
};
Glue.compose(require('./config/manifest'), options, function (err, server) {
    if (err) {
        throw err;
    }
    else {
        Bootstrap(server, require('./config/modules'), (err) => {
            if (err) {
                throw err;
            }
            else {
                server.start(function (err) {
                    if (err) {
                        throw err;
                    }
                    server.start(function () {
                        server.log('info', 'server started');
                    });
                });
            }
        });
    }
});
