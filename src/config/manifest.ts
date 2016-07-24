import Glue = require('glue');

const manifest = {
    server: {
        debug: {
            request: ['error']
        },
        connections: {
            routes: {
                cors: true
            }
        },
        app:{
            db: {
                "uri": "mongodb://localhost/ammacart-api-test",
                "options": {}
            },
            serverBaseUrl: 'http://localhost:5555/'

        }
    },
    connections: [{
        port: 5555,
        host: null
    }],
    registrations: [
        {
            plugin: 'inert'
        },
        {
            plugin: 'hapi-to'
        },
        {
            plugin: {
                register: 'good',
                options: {
                    reporters: {
                        console: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{ log: '*', response: '*' }]
                        }, {
                            module: 'good-console'
                        }, 'stdout']
                    }
                }
            }
        },
        {
            plugin: 'halacious'
        }
    ]
};
export = manifest;
