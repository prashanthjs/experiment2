"use strict";
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
        app: {
            db: {
                "uri": "mongodb://localhost/ammacart-api-test",
                "options": {}
            },
            serverBaseUrl: 'http://localhost:5555/',
            file: {
                image: {
                    uploadDir: __dirname + '/../' + 'assets/image'
                },
                userProfile: {
                    uploadDir: __dirname + '/../' + 'assets/user-profile'
                },
                product: {
                    uploadDir: __dirname + '/../' + 'assets/product/product'
                },
                featureItem: {
                    uploadDir: __dirname + '/../' + 'assets/feature-item'
                }
            }
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
module.exports = manifest;
